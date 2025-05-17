import getStyles from '@/modules/game/helpers/styles';
import { WIDTH_PADDING_PERCENTAGE } from '@/modules/common/constants/size';
import type { CoordinateTube } from '@/modules/game/interfaces';

export default function getPositionBallTube(
  tubePosition: CoordinateTube,
  size: number,
  positionBallTube: number,
): { x: number; y: number } {
  const { height, borderWidth } = getStyles(size, tubePosition.capacity);
  const { x, y } = tubePosition;
  const percentage = size * WIDTH_PADDING_PERCENTAGE;
  const baseX = Math.round(x + percentage / 2);
  const baseY = Math.round(y + height - size - borderWidth - percentage / 2);

  return {
    x: baseX,
    y: baseY - size * positionBallTube,
  };
}
