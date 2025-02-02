import fs from "fs";
import path from "path";
import os from "os";
import { buildDirectoryTree } from "../utils/tree";

describe("utils/tree", () => {
  it("builds ascii tree skipping blacklisted dirs/files", () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "tree-test-"));
    fs.mkdirSync(path.join(tmpDir, "node_modules"));
    fs.mkdirSync(path.join(tmpDir, "sub"));

    fs.writeFileSync(path.join(tmpDir, "package-lock.json"), "");
    fs.writeFileSync(path.join(tmpDir, "fileA.txt"), "");
    fs.writeFileSync(path.join(tmpDir, "sub", "fileB.ts"), "");

    const tree = buildDirectoryTree(tmpDir);
    // Should only see fileA.txt and sub -> fileB.ts in final
    expect(tree).toMatch("fileA.txt");
    expect(tree).toMatch("sub");
    expect(tree).not.toMatch("node_modules");
    expect(tree).not.toMatch("package-lock.json");
  });
});
