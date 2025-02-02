import { FileResult } from "./files";

/**
 * Approximate tokens: ~4 chars per token is a rough guess
 * for many LLM contexts.
 */
export function computeStats(files: FileResult[]): {
  fileCount: number;
  totalSize: number;
  tokenEstimate: number;
} {
  const fileCount = files.length;
  const totalSize = files.reduce((sum, f) => sum + f.content.length, 0);
  const tokenEstimate = Math.ceil(totalSize / 4);
  return { fileCount, totalSize, tokenEstimate };
}
