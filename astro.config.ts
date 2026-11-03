import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import nimbus, {
  defineConfig as defineNimbusConfig,
} from "@cloudflare/nimbus-docs";
import { tableScroll } from "@cloudflare/nimbus-docs/markdown";

const nimbusConfig = defineNimbusConfig({
  // 上线前把这里换成站点的正式地址（结尾不要带斜杠）。它决定 canonical URL、
  // OG 图片的绝对地址、robots.txt、sitemap 以及 /llms.txt 里的链接。
  site: "https://nimbus.ndjp.net",
  // 站点名称：用于 <title>、首页标题和社交卡片。
  title: "Nimbus 中文文档",
  // 一句话介绍，用于 meta 与社交卡片。
  description: "Nimbus 文档写作工具的中文指南：用 Markdown 与 MDX 构建面向人与智能体的文档站点。",
  locale: "zh-CN",
  homeLabel: "首页",
  // 页头显示的 GitHub 链接。
  github: "https://github.com/cloudflare/nimbus",
  socialImageAlt: "Nimbus 中文文档预览",
  // 首页排在最前，其余条目按上游文档站的顺序显式排列。
  sidebar: {
    overviewLabel: "概览",
    items: [
      "quickstart",
      "why-nimbus",
      "project-structure",
      "cli",
      "registry",
      { label: "写作", autogenerate: { directory: "writing" } },
      { label: "内容风格指南", autogenerate: { directory: "style-guide" } },
      { label: "配置", autogenerate: { directory: "reference" } },
      { label: "内容来源", autogenerate: { directory: "content-sources" } },
      { label: "API 参考", autogenerate: { directory: "api-reference" } },
      { label: "导航", autogenerate: { directory: "navigation" } },
      { label: "定制", autogenerate: { directory: "styling" } },
      { label: "AI 智能体", autogenerate: { directory: "ai" } },
      { label: "部署", autogenerate: { directory: "deploy" } },
      { label: "发布与维护", autogenerate: { directory: "publish" } },
      { label: "组件", autogenerate: { directory: "components" } },
      "glossary",
      "changelog",
    ],
  },
});

export default defineConfig({
  // nimbus:adapter
  output: "static",
  // Tailwind v4 via its Vite plugin (the integration Astro recommends for
  // Tailwind v4 — replaces the PostCSS plugin, which doesn't build under
  // Astro 7's Vite 8 bundler).
  vite: {
    plugins: [tailwindcss()],
  },
  // Hover-prefetch link targets so full-page navigations feel instant without
  // a client-side router.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  integrations: [
    nimbus(nimbusConfig, {
      // Authoring rules are opt-in by design — your repo, your taste. The
      // two below are the load-bearing pair: frontmatter has to validate
      // against the content schema for the page to render properly, and
      // broken internal links are 404s for your readers. Add the others
      // (heading hierarchy, code-block language, style, etc.) when you're
      // ready to enforce them — see `nimbus-docs lint --help`.
      rules: {
        "nimbus/frontmatter-shape": "error",
        "nimbus/internal-link": "error",
      },
      markdown: {
        // Wrap wide tables so they scroll instead of overflowing the page
        // (styled by `.nb-table-scroll` in src/styles/prose.css).
        hastPlugins: [tableScroll()],
        // `## Install {#install}` gives a heading a fixed id. A heading that
        // ends in other `{…}` text, such as `{account_id}` in a .md file, is
        // read as attributes too; remove this to keep it as text.
        features: { headingAttributes: true },
      },
    }),
  ],
});
