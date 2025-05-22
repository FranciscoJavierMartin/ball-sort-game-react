import cloneDeep from '@/modules/common/helpers/clone-deep';
import type {
  Balls,
  CoordinateTube,
  SelectedItems,
  TestTubes,
  Undo,
} from '@/modules/game/interfaces';
import validateCompleteTube from '@/modules/game/helpers/validate-complete-tube';
import getPositionBallTube from '@/modules/game/helpers/get-position-ball-tube';
import { INITIAL_SELECTED_ITEMS } from '@/modules/game/constants/game';
import { saveNewTubeDistributionCache } from '@/modules/game/helpers/storage';

export default function validateUndo({
  balls,
  capacity,
  selectedItems,
  size,
  testTubes,
  tubePositions,
  undo,
  setBalls,
  setSelectedItems,
  setTestTubes,
  setUndo,
}: {
  balls: Balls[];
  capacity: number;
  selectedItems: SelectedItems;
  size: number;
  testTubes: TestTubes[];
  tubePositions: CoordinateTube[];
  undo: Undo[];
  setBalls: React.Dispatch<React.SetStateAction<Balls[]>>;
  setSelectedItems: React.Dispatch<React.SetStateAction<SelectedItems>>;
  setTestTubes: React.Dispatch<React.SetStateAction<TestTubes[]>>;
  setUndo: React.Dispatch<React.SetStateAction<Undo[]>>;
}) {
  const copyUndo = cloneDeep(undo);
  const lastUndo = copyUndo.pop();

  if (lastUndo) {
    const copyBalls = cloneDeep(balls);
    const copyTestTubes = cloneDeep(testTubes);

    const { ballsMovedIndex, originTubeIndex, targetTubeIndex } = lastUndo;
    const ballsMoved = ballsMovedIndex.map((v) => v[0]);

    copyTestTubes[targetTubeIndex].balls = copyTestTubes[
      targetTubeIndex
    ].balls.filter((ball) => !ballsMoved.includes(ball));

    const completeTargetTube = validateCompleteTube(
      copyTestTubes[targetTubeIndex],
      balls,
      capacity,
    );

    copyTestTubes[targetTubeIndex].isComplete = completeTargetTube;
    copyTestTubes[targetTubeIndex].showConfetti = completeTargetTube;

    copyTestTubes[originTubeIndex].balls = [
      ...copyTestTubes[originTubeIndex].balls,
      ...ballsMoved.reverse(),
    ];

    const completeOriginTube = validateCompleteTube(
      copyTestTubes[originTubeIndex],
      balls,
      capacity,
    );

    copyTestTubes[originTubeIndex].isComplete = completeOriginTube;
    copyTestTubes[originTubeIndex].showConfetti = completeOriginTube;

    for (let i = 0; i < ballsMovedIndex.length; i++) {
      const [ballIndex, positionTube] = ballsMovedIndex[i];
      const { x, y } = getPositionBallTube(
        tubePositions[originTubeIndex],
        size,
        positionTube,
      );

      copyBalls[ballIndex].indexTube = originTubeIndex;
      copyBalls[ballIndex].bounce = false;
      copyBalls[ballIndex].x = x;
      copyBalls[ballIndex].y = y;
      copyBalls[ballIndex].originalY = y;
      copyBalls[ballIndex].animate = false;
      copyBalls[ballIndex].positionTube = positionTube;
    }

    if (selectedItems.originTubeIndex >= 0) {
      copyBalls[selectedItems.originBallIndex].y =
        copyBalls[selectedItems.originBallIndex].originalY;
      copyBalls[selectedItems.originBallIndex].bounce = false;
      copyBalls[selectedItems.originBallIndex].animate = false;

      setSelectedItems(INITIAL_SELECTED_ITEMS);
    }

    setBalls(copyBalls);
    setTestTubes(copyTestTubes);
    setUndo(copyUndo);

    saveNewTubeDistributionCache(copyTestTubes, copyBalls);
  }
}
