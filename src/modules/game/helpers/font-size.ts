export default function calculateFontSize(
  containerSize: number,
  originalContainerSize = 45,
  originalFontSize = 30,
): number {
  const ratio = originalFontSize / originalContainerSize;
  return Math.round(containerSize * ratio);
}
