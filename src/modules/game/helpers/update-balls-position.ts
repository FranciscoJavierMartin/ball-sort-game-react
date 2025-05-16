import cloneDeep from '@/modules/common/helpers/clone-deep';
import type { Balls, CoordinateTube } from '@/modules/game/interfaces';
import getStyles from '@/modules/game/helpers/styles';
import { WIDTH_PADDING_PERCENTAGE } from '@/modules/common/constants/size';

function getPositionBallTube(
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

export default function updateBallsPosition(
  balls: Balls[],
  coordinates: CoordinateTube[],
  size: number,
): Balls[] {
  const copyBalls = cloneDeep(balls);

  for (let i = 0; i < coordinates.length; i++) {
    const ballsInTube = copyBalls.filter((ball) => ball.indexTube === i);

    if (ballsInTube.length) {
      for (let c = 0; c < ballsInTube.length; c++) {
        const { x, y } = getPositionBallTube(
          coordinates[i],
          size,
          copyBalls[ballsInTube[c].index].positionTube,
        );

        copyBalls[ballsInTube[c].index].x = x;
        copyBalls[ballsInTube[c].index].y = y;
      }
    }
  }

  return copyBalls;
}
