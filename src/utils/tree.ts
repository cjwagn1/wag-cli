import fs from "fs";
import path from "path";
import {
  EXTENDED_BLACKLISTED_DIRS,
  EXTENDED_BLACKLISTED_FILES,
} from "../constants/blacklist";

function isDirBlacklisted(name: string): boolean {
  const lowerName = name.toLowerCase();
  return EXTENDED_BLACKLISTED_DIRS.some(
    (d) => lowerName === d || lowerName.match(d)
  );
}

function isFileBlacklisted(name: string): boolean {
  const lowerName = name.toLowerCase();
  return EXTENDED_BLACKLISTED_FILES.some((f) => {
    if (f.startsWith("*.")) {
      return lowerName.endsWith(f.slice(1));
    }
    return lowerName === f;
  });
}

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
    if (e.isDirectory()) return !isDirBlacklisted(e.name);
    return !isFileBlacklisted(e.name);
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
      result += buildDirectoryTree(path.join(dir, entry.name), newPrefix);
    } else {
      result += itemLine + "\n";
    }
  });

  return result;
}
