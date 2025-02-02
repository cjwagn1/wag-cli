import fs from "fs";
import path from "path";
import os from "os";
import { runCopyCommand } from "../commands/copy";
import { copyToClipboard } from "../utils/clipboard";

jest.mock("../utils/clipboard", () => ({
  __esModule: true,
  copyToClipboard: jest.fn(),
}));

describe("commands/copy", () => {
  it("copies markdown to clipboard and logs stats", () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "copy-test-"));
    fs.writeFileSync(path.join(tmpDir, "testfile.txt"), "test content");

    const consoleSpy = jest.spyOn(console, "log");

    runCopyCommand(tmpDir);

    // Now it's actually a mock
    expect(copyToClipboard).toHaveBeenCalled();

    // Check that console.log printed stats
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("✅ Copied project to clipboard!")
    );
    consoleSpy.mockRestore();
  });
});
