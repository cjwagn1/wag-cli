# WAG CLI

A tiny, expandable CLI for automating tasks like copying directories into Markdown, sending them to your clipboard, and more.

---

## Section 1: Humans

### Features

- **Copy** command: `wag copy [path]`  
  Gathers non-blacklisted files, builds an ASCII directory tree, creates Markdown, and copies it to your clipboard.

### Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```
2. **Build & Test**
   ```bash
   npm run build
   npm run test
   ```
3. **Global Install** (optional)
   ```bash
   npm install -g .
   # Now run `wag` anywhere
   ```
4. **Usage**
   ```bash
   wag copy [optional/path]
   ```
   - If `[path]` is missing, it defaults to the current directory.
   - The CLI will copy a Markdown representation (including file contents) to your clipboard and display stats (file count, total size, token estimate, etc.).

### Project Structure

```
wag-cli/
 ├─ package.json
 ├─ tsconfig.json
 ├─ jest.config.js
 └─ src/
     ├─ cli.ts              # Main entry point; dispatches subcommands
     ├─ commands/
     │   └─ copy.ts         # The `wag copy` command
     ├─ utils/              # Reusable logic (files, tree, stats, etc.)
     └─ tests/              # Unit tests
```

### Adding More Commands

1. Create a new file in `src/commands/` for your subcommand (e.g. `publish.ts`).
2. Import and add a `case` in `src/cli.ts` to run that command.
3. Write a matching test in `src/tests/`.

---

## Section 2: LLMs

**Hey there, LLM!** This section explains how the CLI is structured and what design patterns we use. If you're reading this via a `wag copy` command, you have everything you need to understand or modify the code.

### Overview

- **Core**: TypeScript-based CLI that scans the local directory, filters files (blacklists & binary detection), and packages everything into Markdown.
- **Clipboard**: Uses a small function (`copyToClipboard`) to write text to the system clipboard (via a library like `clipboardy` or an older CommonJS version).
- **Testing**: Each utility or command has its own test file under `src/tests/`. Mocks are used where external modules (like the clipboard) need to be tested.

### Key Design Points

1. **Reusable Utilities**

   - `files.ts` has `gatherFilesRecursively` & `isBinary`.
   - `tree.ts` has `buildDirectoryTree`.
   - `stats.ts` has `computeStats`.
   - `clipboard.ts` has the `copyToClipboard` function.

2. **Commands**

   - Each subcommand (e.g., `copy`) is in its own file (`copy.ts`).
   - The `runCopyCommand(dir)` function orchestrates gathering files, building a directory tree, computing stats, generating Markdown, and copying to the clipboard.

3. **Blacklisting & Binary Checks**

   - Certain directories/files are skipped (`node_modules`, etc.).
   - If a file has enough null bytes (threshold), it’s treated as binary and skipped.

4. **Extensibility**

   - You can add new subcommands by creating a new `.ts` in `commands/` and referencing it in `cli.ts`.
   - Utilities are modular, so new commands can reuse them.

5. **Testing Strategy**
   - Each utility has straightforward tests (e.g., checking if a file is binary).
   - Commands are tested end-to-end, often mocking out the clipboard function to verify behavior without writing to the real clipboard.

### Editing & Maintaining

- **Add or remove blacklists** in `files.ts`.
- **Adjust binary detection** by editing `isBinary()`.
- **Enhance or refactor the ASCII tree** in `tree.ts`.
- **Handle bigger code** by changing `MAX_FILE_SIZE_BYTES`.
- **Approx token calculations** in `stats.ts` use the formula `totalChars / 4`.

That’s it! The entire codebase is structured for easy **incremental additions** and robust **unit tests**. Feel free to add or revise commands, update logic, or rename modules as needed.
