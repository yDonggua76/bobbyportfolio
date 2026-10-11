# Bobby Yu — Motion, AI & Video

个人作品集静态网站，包含 Motion、AI、Video，以及 46 条经过压缩的完整影片。

当前版本：gallery-v25，2026-10-11。

## 在线作品集

https://vermillion-praline-164f3f.netlify.app/

2026-10-11：已部署并认领 Netlify 站点，用户反馈国内访问成功。此仓库用于源码和网页媒体备份；尚未配置 GitHub 自动部署。

## 本地预览

在此目录运行 `python3 -m http.server 8000`，然后打开 `http://localhost:8000`。

## 部署

不需要安装依赖，也不需要构建。网站入口为根目录 `index.html`，媒体位于 `assets/`。

- Vercel：框架选择 Other；不设置构建命令；发布目录使用仓库根目录。
- Netlify 或其他静态托管：不设置构建命令；发布目录为 `.`。
- 普通静态网站空间：保留目录结构，上传网站文件与 `assets/`。

GitHub 上传与网站部署是不同步骤；私有仓库不会自动发布网站。国内访问及视频加载需在选定托管后实际测试。
