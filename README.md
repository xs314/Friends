# [友情链接](https://blog.shiyunhong.com/links/)

## 友链交换须知

1. 友链友链，先友才能后链。<br>
   <sub>如果你和我很熟的话，可以直接忽略下面的内容，直接发起 Pull Request 就好啦~</sub>
2. 原则上只接受博客类型的友链申请。<br>
3. 原创很重要！博客可以长草，但不要滥竽充数，没有实质性内容的博客是不受欢迎的哦~
4. 会正确使用 Git 和 GitHub 。
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
     - 中文：`我们的征途是星辰大海。`
     - English: `My Conquest is the Sea of Stars.`
2. 准备一个自己站点的 Logo。
   - Logo 的外形应为正方形或圆形
   - 长度与宽度应小于 **`512px`** ，以 `128px` 为佳
   - 使用常见文件格式，如 **`webp`（推荐）**、`png`、`jpg`、`svg` 等（不包括 `tiff`、`icns`）。
   - 文件大小应小于 **512 KiB** ，以 128 KiB 以内为佳
   - Logo 应符合 Gravater **G 分级** 要求（即适合在任何网站上展示给任何年龄段的任何人）
3. 准备需要展示的站点名称，长度应小于 16 个半角字符或 8 个全角字符，否则在展示时可能会被截断。
   - 站点名称应适合在任何网站上展示给任何年龄段的任何人
4. （可选）准备一条 Slogan，长度建议小于 35 个半角字符或 20 个全角字符，否则在展示时可能会被截断。
   - Slogan 应适合在任何网站上展示给任何年龄段的任何人
5. 在 GitHub 上 Fork 这个仓库。
6. 在 `src/img` 下提交 Logo 文件。
   - 文件名格式为 `[domain].[format]`，如 `example.com.webp`，`blog.example.com.jpg`
   - Commit 的标题应为 `Add: [filename] ( [url] )`，如 `Add: example.com.webp ( https://example.com )`
7. 修改 `src/links.yml` 文件。
   - 按照如下格式将你的网站信息添加到 `links.yml` 文件的末尾：
     ```yml
     - name: "Site Name" # 网站名称，请使用双引号包裹
       url: https://example.com # 网站链接
       avatar: example.com.webp # Logo 的文件名
       slogan: "Slogan" # Slogan，请使用双引号包裹
     ```
   - Commit 的标题应为 `Add: [sitename] ( [url] )`，如 `Add: example blog ( https://example.com )`
8. 完成上述步骤后，请新建一个 Pull Request。
   - Pull Request 标题应为 `Add: [sitename] ( [url] )`，如 `Add: example blog ( https://example.com )`
9. 当你发起的 Pull Request 被 Review 并被通过、合并后，你的网站将会在 12 个小时内显示在 [友链页面](https://blog.shiyunhong.com/links/)。

---

<sub>本仓库修改自 <a href="https://github.com/renbaoshuo/Friends">RenBaoshuo/Friends</a> ，在此表示感谢。</sub><br>
