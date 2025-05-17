import cloneDeep from '@/modules/common/helpers/clone-deep';
import type { Balls, CoordinateTube } from '@/modules/game/interfaces';
import getPositionBallTube from '@/modules/game/helpers/get-position-ball-tube';

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
