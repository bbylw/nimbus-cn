// Nimbus 的 `check` 会在类型检查时注入一个同名虚拟文件，用于解析 `.astro`
// 组件导入；但在 Windows 上它的路径比较会失败，于是这个文件被当成不存在。
// 提供一个真实文件即可让 `nimbus-docs check` 的类型检查通过。
declare module "*.astro" {
  const component: any;
  export default component;
}
