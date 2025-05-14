/**
 * Set an interrupt...
 * @param ms
 * @returns
 */
export default function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
