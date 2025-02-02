import fs from "fs";
import path from "path";

const BLACKLISTED_DIRS = ["node_modules", ".git", "dist", "build"];
const BLACKLISTED_FILES = ["package-lock.json", "yarn.lock"];

/**
 * Recursively generate an ASCII tree.
 * Example:
 * ```
 * wag-cli
 * ├─ jest.config.js
 * ├─ package.json
 * ├─ src
 * │  └─ ...
 * ```
 */
export function buildDirectoryTree(dir: string, prefix = ""): string {
  const entries = fs.readdirSync(dir, { withFileTypes: true }).filter((e) => {
    if (e.isDirectory())
      return !BLACKLISTED_DIRS.includes(e.name.toLowerCase());
    return !BLACKLISTED_FILES.includes(e.name.toLowerCase());
  });

  // Sort directories first, then files
  entries.sort(
    (a, b) =>
      Number(b.isFile()) - Number(a.isFile()) || a.name.localeCompare(b.name)
  );

  let result = path.basename(dir) + "\n";

  entries.forEach((entry, index) => {
    const isLast = index === entries.length - 1;
    const connector = isLast ? "└─ " : "├─ ";
    const newPrefix = prefix + (isLast ? "   " : "│  ");
    const itemLine = prefix + connector + entry.name;

    if (entry.isDirectory()) {
      result += itemLine + "\n";
      // Recurse
      result += buildDirectoryTree(path.join(dir, entry.name), newPrefix);
    } else {
      // It's a file
      result += itemLine + "\n";
    }
  });

  return result;
}
