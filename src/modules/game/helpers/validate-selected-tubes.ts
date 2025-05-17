import cloneDeep from '@/modules/common/helpers/clone-deep';
import type {
  Balls,
  CoordinateTube,
  SelectedItems,
  TestTubes,
  Tween,
  TweenBall,
} from '@/modules/game/interfaces';
import { INITIAL_SELECTED_ITEMS } from '@/modules/game/constants/game';
import getPositionBallTube from '@/modules/game/helpers/get-position-ball-tube';

function getPositionBallOutsideTube(
  tubePosition: CoordinateTube,
  size: number,
): number {
  return tubePosition.y - (size + size * 0.2);
}

function getTweensBall(
  ballIndex: number,
  tubePositions: CoordinateTube[],
  originTubeIndex: number,
  targetTubeIndex: number,
  size: number,
  positionBallTube: number,
  balls: Balls[],
  firstBall = false,
): TweenBall[] {
  const tween: TweenBall[] = [];

  const { x, y } = getPositionBallTube(
    tubePositions[targetTubeIndex],
    size,
    positionBallTube,
  );

  tween.push(
    {
      ballIndex,
      tweenIndex: 1,
      completed: firstBall,
      x: balls[ballIndex].x ?? 0,
      y: getPositionBallOutsideTube(tubePositions[originTubeIndex], size),
    },
    {
      ballIndex,
      tweenIndex: 2,
      completed: false,
      x,
      y: getPositionBallOutsideTube(tubePositions[targetTubeIndex], size),
    },
    {
      ballIndex,
      tweenIndex: 3,
      completed: false,
      x,
      y,
      positionTube: positionBallTube,
    },
  );

  return tween;
}

function generateTweenBalls({
  balls,
  originBallIndex,
  originTubeIndex,
  size,
  targetTubeIndex,
  testTubes,
  tubePositions,
}: {
  originBallIndex: number;
  originTubeIndex: number;
  testTubes: TestTubes[];
  targetTubeIndex: number;
  tubePositions: CoordinateTube[];
  size: number;
  balls: Balls[];
}): TweenBall[][] {
  const colorBallMove: number = balls[originBallIndex].color;
  const positionBallTube: number = testTubes[targetTubeIndex].balls.length;

  const tween: TweenBall[] = getTweensBall(
    originBallIndex,
    tubePositions,
    originTubeIndex,
    targetTubeIndex,
    size,
    positionBallTube,
    balls,
    true,
  );

  const tweens: TweenBall[][] = [tween];

  let counterNextBall = 2;
  let counterNewBall = 1;

  do {
    const indexNextBall =
      testTubes[originTubeIndex].balls.length - counterNextBall;

    if (indexNextBall >= 0) {
      const nextBall: number = testTubes[originTubeIndex].balls[indexNextBall];
      const colorNextBall: number = balls[nextBall].color;
      const isIncognito = balls[nextBall].incognito;

      if (colorNextBall === colorBallMove && !isIncognito) {
        const nextPositionBallTube: number =
          testTubes[targetTubeIndex].balls.length + counterNewBall;
        const isFullTube: boolean =
          nextPositionBallTube === testTubes[targetTubeIndex].capacity;

        if (!isFullTube) {
          const nextTween: TweenBall[] = getTweensBall(
            nextBall,
            tubePositions,
            originTubeIndex,
            targetTubeIndex,
            size,
            nextPositionBallTube,
            balls,
          );

          tweens.push(nextTween);

          counterNextBall++;
          counterNewBall++;
        } else {
          break;
        }
      } else {
        break;
      }
    } else {
      break;
    }
    // eslint-disable-next-line no-constant-condition
  } while (true);

  return tweens;
}

export default function validateSelectedTubes({
  balls,
  indexSelectedTube,
  selectedItems,
  size,
  testTubes,
  tubePositions,
  setBalls,
  setSelectedItems,
  setTweenBalls,
}: {
  balls: Balls[];
  indexSelectedTube: number;
  selectedItems: SelectedItems;
  size: number;
  testTubes: TestTubes[];
  tubePositions: CoordinateTube[];
  setBalls: React.Dispatch<React.SetStateAction<Balls[]>>;
  setSelectedItems: React.Dispatch<React.SetStateAction<SelectedItems>>;
  setTweenBalls: React.Dispatch<React.SetStateAction<Tween>>;
}): void {
  const copyBalls = cloneDeep(balls);
  const { originBallIndex, originTubeIndex } = selectedItems;
  const tube = testTubes[indexSelectedTube];
  const ballsTube = tube.balls;
  const isEmpty = ballsTube.length === 0;
  const ballIndex = !isEmpty ? ballsTube[ballsTube.length - 1] : -1;
  let ballCanMoved = false;

  if (originTubeIndex < 0) {
    if (!isEmpty && !copyBalls[ballIndex].incognito) {
      copyBalls[ballIndex].originalY = copyBalls[ballIndex].y;
      copyBalls[ballIndex].animate = true;
      copyBalls[ballIndex].y = getPositionBallOutsideTube(
        tubePositions[indexSelectedTube],
        size,
      );
      copyBalls[ballIndex].bounce = false;
      setBalls(copyBalls);
      setSelectedItems({
        originBallIndex: ballIndex,
        originTubeIndex: indexSelectedTube,
      });
    }
  } else {
    if (originTubeIndex === indexSelectedTube) {
      copyBalls[ballIndex].y = copyBalls[ballIndex].originalY;
      copyBalls[ballIndex].animate = true;
      copyBalls[ballIndex].bounce = true;
      setBalls(copyBalls);
      setSelectedItems(INITIAL_SELECTED_ITEMS);
    } else {
      if (isEmpty) {
        ballCanMoved = true;
      } else {
        const ballMove = balls[originBallIndex];
        const firstBallTargetTube = balls[ballIndex];
        const isSameColor = ballMove.color === firstBallTargetTube.color;
        const isIncognito = firstBallTargetTube.incognito;
        const isFullTube = tube.balls.length === tube.capacity;

        if (isSameColor && !isFullTube && !isIncognito) {
          ballCanMoved = true;
        } else {
          copyBalls[originBallIndex].y = copyBalls[originBallIndex].originalY;
          copyBalls[originBallIndex].bounce = true;
          copyBalls[originBallIndex].animate = true;

          copyBalls[ballIndex].bounce = false;
          copyBalls[ballIndex].animate = true;
          copyBalls[ballIndex].originalY = copyBalls[ballIndex].y;
          copyBalls[ballIndex].y = getPositionBallOutsideTube(
            tubePositions[indexSelectedTube],
            size,
          );

          setBalls(copyBalls);
          setSelectedItems({
            originBallIndex: ballIndex,
            originTubeIndex: indexSelectedTube,
          });
        }
      }
    }
  }

  if (ballCanMoved) {
    const tweens = generateTweenBalls({
      originBallIndex,
      testTubes,
      originTubeIndex,
      targetTubeIndex: indexSelectedTube,
      tubePositions,
      size,
      balls,
    });

    setTweenBalls({
      tweens,
      tubes: { origin: originTubeIndex, destinity: indexSelectedTube },
    });

    setSelectedItems(INITIAL_SELECTED_ITEMS);
  }
}
