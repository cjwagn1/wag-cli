import { computeStats } from "../utils/stats";
import { FileResult } from "../utils/files";

describe("utils/stats", () => {
  it("computes stats from file results", () => {
    const sample: FileResult[] = [
      { filePath: "foo.ts", content: "hello" },
      { filePath: "bar.js", content: "world world" },
    ];
    const { fileCount, totalSize, tokenEstimate } = computeStats(sample);
    expect(fileCount).toBe(2);
    expect(totalSize).toBe(5 + 11); // 16
    // ~16 chars => ~4 tokens
    expect(tokenEstimate).toBe(4);
  });
});
