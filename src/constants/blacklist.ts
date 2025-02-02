export const EXTENDED_BLACKLISTED_DIRS = [
  // Node
  "node_modules",
  "dist",
  "build",
  "coverage",
  // Git
  ".git",
  // OS / Editor
  ".vscode",
  ".idea",
  // Python
  "__pycache__",
  ".venv",
  ".venv-",
  ".pytest_cache",
  ".mypy_cache",
  // Rust
  "target",
  // .NET
  "bin",
  "obj",
  ".vs",
  // Java / Kotlin / Gradle
  ".gradle",
  "out",
  // Swift
  ".swiftpm",
  ".build",
  // Other
  ".DS_Store",
  "Thumbs.db",
];

export const EXTENDED_BLACKLISTED_FILES = [
  // Common package managers
  "package-lock.json",
  "yarn.lock",
  "npm-debug.log",
  // OS / Editor junk
  ".DS_Store",
  "Thumbs.db",
  // Large/binary
  "*.exe",
  "*.dll",
  "*.png",
  "*.jpg",
  "*.jpeg",
  "*.gif",
  "*.ico",
  "*.mp4",
  "*.mov",
  "*.mp3",
  "*.pdf",
  "*.doc",
  "*.docx",
  // Logs
  "*.log",
  "*.log.*",
  "*.out",
  "*.err",
  // Others
  "*.suo",
  "*.user",
  "*.csproj.user",
  "Cargo.lock",
  "*.env",
  ".env",
];
