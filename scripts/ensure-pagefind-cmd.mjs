/**
 * Bun on Windows links binaries as `.bunx` / `.exe`, not the `.cmd` shim
 * Nimbus's build step looks for when it runs Pagefind. Recreate that shim
 * after `bun install` so `bun run build` indexes search on Windows.
 */
import { existsSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

if (process.platform === "win32") {
  const bin = join(dirname(fileURLToPath(import.meta.url)), "..", "node_modules", ".bin");
  if (existsSync(join(bin, "pagefind.exe"))) {
    writeFileSync(join(bin, "pagefind.cmd"), '@echo off\r\n"%~dp0pagefind.exe" %*\r\n');
  }
}
