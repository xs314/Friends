import gulp from 'gulp';
import yaml from 'gulp-yaml';
import htmlMinifier from 'gulp-html-minifier-terser';
import del from 'delete';
import sharp from 'sharp';
import path from 'node:path';
import { Transform } from 'node:stream';

// 编码参数（仅 AVIF 单产物）
const ENCODE = {
    targetSize: 128,
    avif: { quality: 65, effort: 8, chromaSubsampling: '4:4:4' },
};

// 源图只接受 png / svg（svg 原样透传）
const IMG_SRC = 'src/img/**/*.{png,svg}';
const VECTOR_EXT = /\.svg$/i;
const RASTER_EXT = /\.png$/i;

/**
 * 自定义 gulp transform：
 *   - SVG：原样复制
 *   - PNG：resize 到 128x128（contain + 白底），输出同名 .avif
 *   产物目录 dist/img/ 中只有 .avif 与 .svg，不再保留 PNG/WebP 兜底。
 */
function processImages() {
    return new Transform({
        objectMode: true,
        async transform(file, enc, cb) {
            if (file.isNull() || !file.path) return cb(null, file);

            const ext = path.extname(file.path);

            // SVG：原样通过
            if (VECTOR_EXT.test(ext)) {
                this.push(file.clone());
                return cb();
            }

            if (!RASTER_EXT.test(ext)) {
                return cb();
            }

            try {
                const base = path.basename(file.path, ext);
                const buf = file.contents;

                const resized = await sharp(buf)
                    .rotate()
                    .resize(ENCODE.targetSize, ENCODE.targetSize, {
                        fit: 'contain',
                        withoutEnlargement: true,
                        background: { r: 255, g: 255, b: 255, alpha: 1 },
                    })
                    .toBuffer();

                const avifBuf = await sharp(resized).avif(ENCODE.avif).toBuffer();

                const out = file.clone({ contents: false });
                out.contents = avifBuf;
                out.path = path.join(path.dirname(file.path), base + '.avif');
                this.push(out);

                const beforeKB = buf.length / 1024;
                const afterKB = avifBuf.length / 1024;
                const saved = beforeKB > 0 ? (100 - (afterKB / beforeKB) * 100) : 0;
                process.stdout.write(
                    '  ' + String(path.basename(file.path)).padEnd(26) +
                    ' -> ' + String(base + '.avif').padEnd(32) +
                    ' 原 ' + beforeKB.toFixed(1).padStart(6) + ' KB' +
                    '  AVIF ' + afterKB.toFixed(1).padStart(6) + ' KB' +
                    '  (节省 ' + saved.toFixed(0) + '%)\n'
                );

                cb();
            } catch (err) {
                cb(new Error('图片处理失败 ' + file.path + ': ' + err.message));
            }
        },
    });
}

gulp.task('clean-dist', () => del('dist'));

gulp.task('build-json', () =>
    gulp
        .src('./src/*.yml')
        .pipe(yaml())
        .pipe(
            new Transform({
                objectMode: true,
                transform(file, enc, cb) {
                    if (file.isNull() || !/\.json$/i.test(file.path)) return cb(null, file);
                    try {
                        const items = JSON.parse(file.contents.toString('utf8'));
                        for (const it of items) {
                            // avatar：不管源图是什么扩展名，统一输出成同名 .avif
                            if (typeof it.avatar === 'string') {
                                it.avatar = it.avatar.replace(/\.(png|jpe?g|webp|gif)$/i, '.avif');
                            }
                            // url 规范化：
                            //   - 已经带 http:// 或 https:// 的 → 仅去末尾的 /
                            //   - 裸域名（没协议头）的 → 补 https:// 再去末尾 /
                            if (typeof it.url === 'string' && it.url.trim()) {
                                let u = it.url.trim();
                                if (!/^https?:\/\//i.test(u)) u = 'https://' + u;
                                u = u.replace(/\/+$/, '');
                                it.url = u;
                            }
                        }
                        file.contents = Buffer.from(JSON.stringify(items, null, 0));
                    } catch (_) {
                        // 非数组 JSON 保持原样
                    }
                    cb(null, file);
                },
            })
        )
        .pipe(gulp.dest('dist'))
);

gulp.task('minify-html', () =>
    gulp
        .src('src/**/*.html')
        .pipe(
            htmlMinifier({
                minifyCSS: true,
                minifyJS: true,
                removeComments: true,
                collapseWhitespace: true,
            })
        )
        .pipe(gulp.dest('dist'))
);

gulp.task('process-images', () =>
    gulp.src(IMG_SRC).pipe(processImages()).pipe(gulp.dest('dist/img'))
);

gulp.task('copy-files', () => gulp.src('public/**').pipe(gulp.dest('dist')));

gulp.task('build', gulp.parallel('build-json', 'minify-html', 'process-images'));

gulp.task(
    'default',
    gulp.series('clean-dist', gulp.parallel('build'), 'copy-files')
);
