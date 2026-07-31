# 民间鬼故事与奇谈 · 文章搜集存放网站 — 实施计划

## 一、项目目标

做一个「搜集 + 存放」民间鬼故事 / 奇谈的网站：

- 内容以 ****Markdown 文件****形式存放（最易维护、利于长期积累）。
- 访客可****按分类 / 标签浏览****、****站内搜索****、****沉浸式阅读****。
- 支持****管理员录入****与****用户投稿****两种内容来源。
- 支持****评论互动****。
- 阶段目标：****先本地预览****，不强制公网部署（部署留作后期）。

## 二、关键技术决策（请重点确认）

你选了「纯静态」但又选了「投稿 + 评论」，二者矛盾。解决方案：

|   |   |   |
|---|---|---|
|需求|方案|是否需自建后端|
|网站本体 / 故事展示|纯静态（构建期生成 HTML）|否|
|文章存储|Markdown 文件（放进仓库）|否|
|分类 / 标签 / 搜索|构建期生成索引 + 前端搜索|否|
|评论互动|**Giscus**（基于 GitHub Discussions，免费、无需服务器）|否|
|用户投稿|**表单服务**（Formspree / Getform 免费档）收集草稿 → 管理员审核后转成 Markdown|否|

> 说明：Giscus 与表单服务都需要一个****公开的 GitHub 仓库****才能正式生效；本地预览时它们会显示占位/可填写但暂不实连。这是"纯静态 + 动态功能"的标准做法，不增加你的运维负担。

## 三、技术栈（推荐）

- ****Astro****（静态站点生成器）：原生支持 Markdown 内容集合、自动生成分类/标签页，输出纯静态 HTML。Node 22 已就绪，适合内容型站点，学习曲线平缓。
- ****搜索****：`@astrojs/pagefind`（构建期生成全文搜索索引，纯前端，本地可用）。
- ****评论****：`giscus`。
- ****投稿****：`Formspree` 免费档（或 Getform）。
- ****样式****：原生 CSS + CSS 变量（暗色主题），不引入重型 UI 框架，便于理解与维护。
- __备选__：若不想要构建工具，可用「纯 HTML/CSS/JS + 手写 JSON 索引」，但多文章维护成本高，不推荐。

## 四、内容模型（每篇故事 = 一个 Markdown 文件）

路径：`src/content/stories/xxx.md`，Frontmatter 示例：

---
title: 标题
source: 民间搜集 / 投稿人昵称   # 来源
category: 乡村异闻             # 分类（固定枚举）
tags: [狐仙, 东北]             # 标签（自由）
date: 2026-07-30
warning: 含惊悚描写            # 内容警示（可选）
featured: false               # 是否首页推荐
---
正文（Markdown 写作）…

分类枚举（可在计划中调整）：`民间怪谈` / `都市传说` / `乡村异闻` / `狐黄白柳灰` / `亲身经历` / `未解之谜`。

## 五、站点结构（页面）

src/pages/
├── index.astro              # 首页：推荐故事 + 分类入口 + 随机故事
├── stories/[slug].astro     # 故事详情页（正文 + 目录 + 评论 + 内容警示）
├── categories/index.astro   # 全部分类
├── categories/[category].astro
├── tags/[tag].astro         # 标签聚合页
├── search.astro             # 搜索页（Pagefind UI）
├── submit.astro             # 投稿页（Formspree 表单）
└── about.astro             # 关于 / 收录说明

组件：`Header` / `Footer` / `StoryCard` / `ThemeToggle`（夜间模式）/ `TableOfContents` / `Comments(Giscus)` / `SubmitForm`。

## 六、功能实现要点

1. ****分类与标签浏览****：Astro `getStaticPaths` 自动生成各分类/标签页；`StoryCard` 列表展示。
2. ****站内搜索****：Pagefind 构建索引，`search.astro` 嵌入搜索框，纯前端毫秒级检索。
3. ****阅读体验****：默认暗色（墨色 + 烛光暖色点缀）、衬线中文字体；`ThemeToggle` 切换日间/夜间；字号调节 + 正文目录导航（TOC）。
4. ****评论****：`Comments.astro` 封装 Giscus `<script>`，按仓库配置 `data-repo` 等属性。
5. ****用户投稿****：`submit.astro` 表单（标题/来源/分类/标签/正文/警示），提交至 Formspree 端点；管理员收到后整理为 Markdown 入库。

## 七、视觉风格

- 主题：幽暗水墨 + 烛光暖橙点缀，衬线标题字体，留白克制，营造"夜读怪谈"氛围。
- 响应式：手机 / 桌面均可用。
- 细节：故事卡悬停微光、首页随机故事按钮、分类页纹理背景。

## 八、实施步骤（分阶段，每阶段可独立验证）

1. ****脚手架****：初始化 Astro 项目、目录结构、全局暗色样式与设计变量、Header/Footer。
2. ****内容层****：定义 `src/content.config.ts` 故事 schema；放入 3–5 篇示例鬼故事（占位真实风格文本）。
3. ****首页 + 详情页 + 列表页****：`index` / `stories/[slug]` / `categories` / `tags`。
4. ****搜索****：接入 Pagefind，完成 `search.astro`。
5. ****阅读体验****：夜间模式、字号、TOC。
6. ****评论****：接入 Giscus（需你提供 GitHub 仓库后填配置）。
7. ****投稿****：接入 Formspree 表单（`submit.astro`）。
8. ****本地预览与文档****：`npm run dev` 本地预览；写 `README.md` 说明「如何新增一篇故事」。

## 九、示例内容（种子数据）

先放 3–5 篇民间风格占位故事（如《村口老槐树》《走夜路莫回头》《狐仙借粮》），结构完整、可直接替换。

## 十、待你确认 / 后续

- ✅ ****已确认****：采用「Giscus 评论 + Formspree 投稿」第三方方案，网站本体保持纯静态、零运维。
- 正式启用评论/投稿前，需要你建一个****公开 GitHub 仓库****并授权 Giscus；投稿表单需注册 Formspree 拿到端点。
- 公网部署（如 CloudStudio / GitHub Pages / Vercel）留作后期一键发布。

## 十一、关键文件（将创建）

- `package.json` / `astro.config.mjs` — 项目配置
- `src/content.config.ts` — 故事内容 schema
- `src/layouts/BaseLayout.astro` — 基础布局
- `src/pages/*.astro` — 各页面
- `src/components/*.astro` — 复用组件
- `src/styles/global.css` — 全局暗色主题
- `README.md` — 使用与录入说明