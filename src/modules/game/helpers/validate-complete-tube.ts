import type { Balls, TestTubes } from '@/modules/game/interfaces';

export default function validateCompleteTube(
  tube: TestTubes,
  balls: Balls[],
  capacity: number,
): boolean {
  const colorBallsTube = tube.balls
    .filter((ballIndex) => !balls[ballIndex].incognito)
    .map((ballIndex) => balls[ballIndex].color);
  const firstBallColor = colorBallsTube[0];
  const isSameColor = colorBallsTube.every((color) => color === firstBallColor);

  return isSameColor && colorBallsTube.length === capacity;
}
