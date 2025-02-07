import gulp from 'gulp';
import gulpIf from 'gulp-if';
import yaml from 'gulp-yaml';
import htmlMinifier from 'gulp-html-minifier-terser';
import imageResize from 'gulp-image-resize';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import webp from 'imagemin-webp';
import del from 'delete';
import { mozjpeg,svgo } from 'gulp-imagemin';

const configs = {
    htmlMinifier: {
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        collapseWhitespace: true,
    },
    imageResize: {
        width: 128,
        crop: false,
        imageMagick: true,
    },
    mozjpeg: {},
    pngquant: {
        strip: true,
        verbose: true,
    },
    webp: {},
    svgo: {
        plugins: ['preset-default'],
    },
};

gulp.task('clean-dist', () => del('dist'));

gulp.task('build-json', () =>
    gulp.src('./src/*.yml').pipe(yaml()).pipe(gulp.dest('dist'))
);

gulp.task('minify-html', () =>
    gulp
        .src('src/**/*.html')
        .pipe(htmlMinifier(configs.htmlMinifier))
        .pipe(gulp.dest('dist'))
);

gulp.task('minify-image', () =>
    gulp
        .src('src/img/**/*.{png,jpg,gif,svg,webp,jpeg}')
        .pipe(
            gulpIf(
                (file) => !/\.svg$/i.test(file.path),
                imageResize(configs.imageResize)
            )
        )
        .pipe(
            imagemin(
                [
                    mozjpeg(configs.mozjpeg),
                    pngquant(configs.pngquant),
                    webp(configs.webp),
                    svgo(configs.svgo),
                ],
                {
                    verbose: true,
                }
            )
        )
        .pipe(gulp.dest('dist/img'))
);

gulp.task('copy-files', () => gulp.src('public/**').pipe(gulp.dest('dist')));

gulp.task('build', gulp.parallel('build-json', 'minify-html', 'minify-image'));

gulp.task(
    'default',
    gulp.series('clean-dist', gulp.parallel('build'), 'copy-files')
);
