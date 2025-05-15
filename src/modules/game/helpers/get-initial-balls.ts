import COLORS_BALLS from '@/modules/common/constants/color';
import type { Balls, TubesType } from '@/modules/game/interfaces';

export default function getInitialBalls(tubes: TubesType): Balls[] {
  const newBalls: Balls[] = [];
  let index: number = 0;

  for (const tube in tubes) {
    const balls = tubes[tube].balls || [];

    if (balls.length) {
      for (let i = 0; i < balls.length; i++) {
        newBalls.push({
          index,
          indexTube: +tube,
          incognito: balls[i].incognito || false,
          animate: false,
          bounce: false,
          positionTube: i,
          color: balls[i].value,
          colors: COLORS_BALLS[balls[i].value],
        });

        index++;
      }
    }
  }

  return newBalls;
}
