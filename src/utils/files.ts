// src/utils/files.ts

import fs from "fs";
import path from "path";
import {
  EXTENDED_BLACKLISTED_DIRS,
  EXTENDED_BLACKLISTED_FILES,
} from "../constants/blacklist";

const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024; // 2MB
const BLACKLISTED_DIRS = ["node_modules", ".git", "dist", "build"];
const BLACKLISTED_FILES = ["package-lock.json", "yarn.lock"];

export function isBinary(buffer: Buffer): boolean {
  // If >3 null bytes in first 1000 bytes => consider it binary
  const sample = buffer.slice(0, 1000);
  let nullCount = 0;
  for (const byte of sample) {
    if (byte === 0) nullCount++;
    if (nullCount > 3) return true;
  }
  return false;
}

export interface FileResult {
  filePath: string;
  content: string;
}

/** Recursively gather text-file contents. */
export function gatherFilesRecursively(
  dir: string,
  out: FileResult[] = []
): FileResult[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);
    const lowerName = entry.name.toLowerCase();

    // Skip blacklisted dirs (extended)
    if (entry.isDirectory()) {
      if (
        !EXTENDED_BLACKLISTED_DIRS.some(
          (d) => d === lowerName || lowerName.match(d)
        )
      ) {
        gatherFilesRecursively(entryPath, out);
      }
      continue;
    }

    // Skip blacklisted files (extended)
    if (
      EXTENDED_BLACKLISTED_FILES.some((f) => {
        if (f.startsWith("*.")) {
          // e.g. "*.png"
          return lowerName.endsWith(f.slice(1));
        } else {
          return lowerName === f;
        }
      })
    ) {
      continue;
    }

    // Skip base-level blacklisted files
    if (entry.isFile()) {
      if (BLACKLISTED_FILES.includes(entry.name.toLowerCase())) {
        continue;
      }

      // Check file size & binary
      const stats = fs.statSync(entryPath);
      if (stats.size <= MAX_FILE_SIZE_BYTES) {
        const buffer = fs.readFileSync(entryPath);
        if (!isBinary(buffer)) {
          out.push({ filePath: entryPath, content: buffer.toString() });
        }
      }
    }
  }

  return out;
}
