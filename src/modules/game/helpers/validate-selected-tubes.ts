import cloneDeep from '@/modules/common/helpers/clone-deep';
import type {
  Balls,
  CoordinateTube,
  SelectedItems,
  TestTubes,
} from '@/modules/game/interfaces';
import { INITIAL_SELECTED_ITEMS } from '@/modules/game/constants/game';

function getPositionBallOutsideTube(
  tubePosition: CoordinateTube,
  size: number,
): number {
  return tubePosition.y - (size + size * 0.2);
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
}: {
  balls: Balls[];
  indexSelectedTube: number;
  selectedItems: SelectedItems;
  size: number;
  testTubes: TestTubes[];
  tubePositions: CoordinateTube[];
  setBalls: React.Dispatch<React.SetStateAction<Balls[]>>;
  setSelectedItems: React.Dispatch<React.SetStateAction<SelectedItems>>;
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
  }
}
