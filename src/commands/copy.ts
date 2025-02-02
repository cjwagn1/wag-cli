import path from "path";
import { gatherFilesRecursively } from "../utils/files";
import { buildDirectoryTree } from "../utils/tree";
import { computeStats } from "../utils/stats";
import { copyToClipboard } from "../utils/clipboard";

export function runCopyCommand(dir: string) {
  // Gather
  const filesData = gatherFilesRecursively(dir);
  const { fileCount, totalSize, tokenEstimate } = computeStats(filesData);

  // Build directory tree
  const tree = buildDirectoryTree(dir);

  // Build final Markdown
  let mdOutput = `# Directory Contents for \`${dir}\`\n\n`;
  mdOutput += `## Directory Tree\n\n`;
  mdOutput += `\`\`\`\n${tree}\n\`\`\`\n\n`;

  for (const { filePath, content } of filesData) {
    mdOutput += `## \`${path.relative(dir, filePath)}\`\n`;
    mdOutput += `\n\`\`\`\n${content}\n\`\`\`\n\n`;
  }

  // Copy to clipboard
  try {
    copyToClipboard(mdOutput);
    console.log("✅ Copied project to clipboard!");
    console.log(`• Directory: ${dir}`);
    console.log(`• Files: ${fileCount}`);
    console.log(`• Total chars: ${totalSize}`);
    console.log(`• Estimated tokens: ${tokenEstimate}`);
  } catch (err) {
    console.error("❌ Failed to copy to clipboard:", err);
  }
}
