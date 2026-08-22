# ChatGPT Plus GitHub Pages 引流站

这是一个仿 Hexo / NexT 风格的静态博客站，适合部署到 GitHub Pages。

## 本地生成

```bash
npm run build
```

生成后的静态文件在：

```text
docs/
```

## 本地预览

```bash
npm run dev
```

打开：

```text
http://localhost:4173
```

## 修改站点内容

主要改这个文件：

```text
content/site.mjs
```

里面包含：

- 站点标题
- GitHub Pages 默认域名
- goplus.pro 引流链接
- 文章列表
- 分类和标签
- 每篇文章正文

## 发布到 GitHub Pages

推荐仓库名：

```text
chatgpt-plus-guide
```

发布后默认地址类似：

```text
https://你的用户名.github.io/chatgpt-plus-guide/
```

如果仓库名不同，需要修改：

```js
baseUrl: "https://你的用户名.github.io/你的仓库名"
```

然后重新运行：

```bash
npm run build
```

GitHub Pages 设置：

```text
Settings -> Pages -> Build and deployment -> Deploy from a branch
Branch: main
Folder: /docs
```

## SEO 提交

发布后提交到 Search Console：

```text
https://你的用户名.github.io/chatgpt-plus-guide/
```

站点地图：

```text
https://你的用户名.github.io/chatgpt-plus-guide/sitemap.xml
```
