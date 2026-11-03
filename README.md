# Nimbus

Nimbus 是一个基于 [Astro](https://astro.build) 构建的文档写作工具。它会在你的仓库里创建一个文档站点，检查你和你的智能体所写的内容，并将其发布为面向人的 HTML 和面向智能体的 Markdown。

文档：[nimbus-docs.com](https://nimbus-docs.com)

## 快速开始

需要 Node.js 22.12.0 或更高版本。

```sh
npx @cloudflare/create-nimbus-docs@latest my-docs --yes --package-manager npm
cd my-docs
npm run dev
```

页面以 [MDX 或 Markdown](https://nimbus-docs.com/writing/markdown-and-mdx) 的形式存放在 `src/content/docs/` 中。从 `src/content/docs/index.mdx` 开始，在 `astro.config.ts` 中设置站点的 URL、标题和描述；这些项初始是占位值。

## 工作原理

- **你的仓库**存放站点：由脚手架复制进来的布局、组件、样式、路由和内容。其中任意部分都可以修改。
- **`@cloudflare/nimbus-docs`** 是依赖项：包含 Astro 集成、你的路由所调用的辅助函数，以及 `nimbus-docs` CLI。
- **[组件注册表](https://nimbus-docs.com/registry)**存放可选的组件和功能。`nimbus-docs add` 会以源码形式把组件复制进来；功能则是编码智能体应用到你项目中的 Markdown 配方。

## 功能特性

写作：

- MDX 组件：代码块、标签页、步骤、卡片、文件树、可复用片段以及交互式图表。其中部分可通过 `nimbus-docs add` 按需安装。
- 由 OpenAPI 3.x 生成的 API 参考文档，支持多个 API 版本。
- 文档版本管理、搜索，以及从其他 Git 仓库或 Notion 加载的页面。

检查：

- 配置、frontmatter 和 MDX 组件会在构建期间进行校验。
- `nimbus-docs lint` 会根据 `astro.config.ts` 中配置的规则，报告写作中的错误。它不会阻断构建。
- `nimbus-docs check` 在不构建的情况下，检查环境、结构、内容、类型以及待升级项。`--fix` 会应用安全的修复；`--json` 会把检查结果交给智能体。

面向智能体发布：

- 文档与 API 参考页面的 Markdown 版本，外加 `llms.txt` 和 `llms-full.txt`。隐藏版本会被排除。
- 可选的 Agent Skills、WebMCP 搜索，以及一个远程 MCP 服务器。

## 部署

站点默认是静态的：执行 `npm run build`，然后将输出托管到任意位置。按需渲染页面以及远程 MCP 服务器需要服务器适配器（Cloudflare、Netlify、Vercel 或 Node）；详见[部署](https://nimbus-docs.com/deploy)。

## 软件包

| 软件包 | 说明 |
| --- | --- |
| [`@cloudflare/create-nimbus-docs`](https://github.com/cloudflare/nimbus/tree/main/packages/create-nimbus-docs) | 用于创建新站点。 |
| [`@cloudflare/nimbus-docs`](https://github.com/cloudflare/nimbus/tree/main/packages/nimbus-docs) | Astro 集成以及 `nimbus-docs` CLI。 |

## 状态

Pre-1.0（尚未发布 1.0）。公开 API 可能在次版本之间发生变化。升级前请锁定版本，并阅读各软件包的更新日志（[nimbus-docs](https://github.com/cloudflare/nimbus/blob/main/packages/nimbus-docs/CHANGELOG.md)、[create-nimbus-docs](https://github.com/cloudflare/nimbus/blob/main/packages/create-nimbus-docs/CHANGELOG.md)）。

## 贡献

从一个 issue 或 discussion 开始。一旦维护者批准，你的 pull request 会进入正常的评审流程。关于架构与智能体相关背景，请参阅 [CONTRIBUTING.md](https://github.com/cloudflare/nimbus/blob/main/CONTRIBUTING.md) 与 [CLAUDE.md](https://github.com/cloudflare/nimbus/blob/main/CLAUDE.md)。

## 许可证

[MIT](https://github.com/cloudflare/nimbus/blob/main/LICENSE)
