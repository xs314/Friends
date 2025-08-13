# [友情链接](https://blog.shiyunhong.com/links/)

也可以通过 [github.dev/xs314/Friends](https://github.dev/xs314/Friends) 在线编辑（把仓库地址的 `github.com` 改成 `github.dev` 也行）。

## 友链交换须知

1. 友链友链，先友才能后链。<br>
   <sub>如果你和我很熟的话，可以直接忽略下面的内容，直接发起 Pull Request 就好啦~</sub>
2. 原则上只接受博客类型的友链申请。<br>
3. 原创很重要！博客可以长草，但不要滥竽充数，没有实质性内容的博客是不受欢迎的哦~
4. 具备基本的 Git / GitHub 使用能力。
5. 最终解释权归 XiaoShi 所有。

## 友链交换流程

1. 先添加本站的友链。
   - 名称
     - 中文：`小石同学`（或 `小石`）
     - English: `XiaoShi's Blog` (or `XiaoShi`)
   - URL
     - `https://blog.shiyunhong.com/?utm_source=friends`
   - Logo
     - Favicon
       - [`48x48`, ico](https://img.shiyunhong.com/index.ico)
     - 头像
       - [`612x612`, webp](https://img.shiyunhong.com/gravatar.webp)
     - 如果你的友链页面没有放 Logo 的地方就可以不用放了哦~
   - Slogan
     - 中文：`随手分享，记录踩坑。`
     - English: `Sharing what I learn, noting what I break.`
2. 准备一个自己站点的 Logo。
   - Logo 的外形应为正方形或圆形
   - 长度与宽度应小于 **`512px`** ，以 `128px` 为佳
   - 文件格式只接受 **`png`**（推荐）与 **`svg`**；构建时会统一压缩为 **AVIF** 输出
   - 文件大小应小于 **512 KiB** ，以 128 KiB 以内为佳
   - Logo 应符合 Gravater **G 分级** 要求（即适合在任何网站上展示给任何年龄段的任何人）
3. 准备需要展示的站点名称，长度应小于 16 个半角字符或 8 个全角字符，否则在展示时可能会被截断。
   - 站点名称应适合在任何网站上展示给任何年龄段的任何人
4. （可选）准备一条 Slogan，长度建议小于 35 个半角字符或 20 个全角字符，否则在展示时可能会被截断。
   - Slogan 应适合在任何网站上展示给任何年龄段的任何人
5. 进入仓库进行编辑。
   - 推荐通过页面顶部的 github.dev 链接直接进入在线编辑器，首次提交时会自动提示创建 fork；
   - 如果习惯传统方式，也可以先 Fork 本仓库再操作。
6. 在 `src/img` 下提交 Logo 文件。
   - 文件名格式为 `[domain].png`（或 `.svg`），如 `example.com.png`，`blog.example.com.svg`
   - Commit 的标题应为 `Add: [filename] ( [url] )`，如 `Add: example.com.png ( https://example.com )`
7. 修改 `src/links.yml` 文件。
   - 按照如下格式将你的网站信息添加到 `links.yml` 文件的末尾：
     ```yml
     - name: "Site Name"
       url: https://example.com
       avatar: example.com.png
       slogan: "Slogan"
     ```
   - 字段说明：
     - `name` / `slogan`：请用双引号包裹。
     - `url`：可以带 `http://` 或 `https://`，也可以只写裸域名 `example.com`（构建时会自动补 `https://`）；末尾带不带 `/` 都可以。
     - `avatar`：文件名必须与 `src/img/` 下提交的 Logo 一致。
   - Commit 的标题应为 `Add: [sitename] ( [url] )`，如 `Add: example blog ( https://example.com )`
8. 完成上述步骤后，请新建一个 Pull Request。
   - Pull Request 标题应为 `Add: [sitename] ( [url] )`，如 `Add: example blog ( https://example.com )`
   - 可选本地构建：`bun install && bun run build`，然后用任意静态文件服务器打开 `dist/` 目录。
   - 不做本地构建也可以，PR 提交后 GitHub Actions 会自动执行构建校验，确认通过即可等待 Review。
9. 当你发起的 Pull Request 被 Review 并被通过、合并后，你的网站将会在 12 个小时内显示在 [友链页面](https://blog.shiyunhong.com/links/)。

---

<sub>本仓库修改自 <a href="https://github.com/renbaoshuo/Friends">RenBaoshuo/Friends</a> ，在此表示感谢。</sub><br>
