import { buildDirectoryTree } from "../utils/tree";

export function runTreeCommand(dir: string): void {
  const tree = buildDirectoryTree(dir);
  console.log(tree);
}
