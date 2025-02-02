import clipboardy from "clipboardy";

export function copyToClipboard(text: string): void {
  clipboardy.writeSync(text);
}
