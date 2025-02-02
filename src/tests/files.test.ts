import fs from "fs";
import path from "path";
import os from "os";
import { gatherFilesRecursively, isBinary } from "../utils/files";

describe("utils/files", () => {
  it("detects binary vs text", () => {
    const textBuffer = Buffer.from("Hello world");
    expect(isBinary(textBuffer)).toBe(false);

    const binBuffer = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00]);
    expect(isBinary(binBuffer)).toBe(true);
  });

  it("gathers text files recursively", () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "files-test-"));
    const subDir = path.join(tmpDir, "sub");
    fs.mkdirSync(subDir);

    fs.writeFileSync(path.join(tmpDir, "fileA.txt"), "hello A");
    fs.writeFileSync(path.join(subDir, "fileB.ts"), "console.log('B');");

    const results = gatherFilesRecursively(tmpDir);
    const names = results.map((r) => path.basename(r.filePath));
    expect(names).toContain("fileA.txt");
    expect(names).toContain("fileB.ts");
  });
});
