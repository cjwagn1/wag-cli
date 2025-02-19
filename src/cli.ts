#!/usr/bin/env node

import { runCopyCommand } from "./commands/copy";
import { runTreeCommand } from "./commands/tree";

(async function main() {
  const [, , subcommand, ...args] = process.argv;

  switch (subcommand) {
    case "copy": {
      const targetDir = args[0] || process.cwd();
      runCopyCommand(targetDir);
      break;
    }
    case "tree": {
      const targetDir = args[0] || process.cwd();
      runTreeCommand(targetDir);
      break;
    }
    default:
      console.log(`Usage: wag <subcommand> [args]

Available subcommands:
  copy [path]   Recursively gather code & copy as Markdown to clipboard
  tree [path]   Output ASCII directory tree to terminal
`);
      break;
  }
})();
