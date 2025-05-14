/**
 * Returns a "random" number, given a range...
 * @param min
 * @param max
 * @returns
 */
export default function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
