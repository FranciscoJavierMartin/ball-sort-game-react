/**
 * Copy text to the clipboard...
 * @param {*} text
 */
export default function copyToClipboard(text: string = ''): void {
  navigator.clipboard.writeText(text);
}
