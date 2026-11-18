import { cpSync, mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const out = join(root, "public");

const skip = new Set([
  "public",
  "node_modules",
  "components",
  "lib",
  "scratch",
  "scripts",
  ".git",
  ".vercel",
]);

const skipFiles = new Set([
  "package.json",
  "package-lock.json",
  "tsconfig.json",
  "vercel.json",
  "extract_hero.js",
  "temp_hero_video_request.txt",
  "README.md",
]);

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

for (const name of readdirSync(root)) {
  if (name.startsWith(".")) continue;
  if (skip.has(name) || skipFiles.has(name)) continue;
  if (name.endsWith(".py")) continue;

  const src = join(root, name);
  cpSync(src, join(out, name), { recursive: statSync(src).isDirectory() });
}

console.log("Prepared Vercel output in public/");
