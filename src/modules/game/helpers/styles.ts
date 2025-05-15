import {
  HEIGHT_OFFSET_PERCENTAGE,
  WIDTH_PADDING_PERCENTAGE,
} from '@/modules/common/constants/size';

export default function getStyles(
  size: number,
  capacity: number,
): { width: number; borderWidth: number; height: number } {
  const width: number = Math.round(size + size * WIDTH_PADDING_PERCENTAGE);
  const borderWidth: number = Math.round(width - width * 0.95);
  const height: number = Math.round(
    size * capacity + size * HEIGHT_OFFSET_PERCENTAGE,
  );

  return {
    width,
    height,
    borderWidth,
  };
}
