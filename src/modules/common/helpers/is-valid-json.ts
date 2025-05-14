/**
 * Validates whether a string is valid JSON...
 * @param json
 * @returns
 */
export default function isValidJson(json: string): boolean {
  try {
    JSON.parse(json);
    return true;
  } catch {
    return false;
  }
}
