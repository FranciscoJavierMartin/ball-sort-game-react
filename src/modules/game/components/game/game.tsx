import { useEffect, useRef, useState } from 'react';
import type { HeaderActions } from '@/modules/common/constants/header';
import GameWrapper from '@/modules/game/components/game-wrapper/game-wrapper';
import GameHeader from '@/modules/game/components/game-header/game-header';
import type {
  Balls,
  CoordinateTube,
  GameProps,
  SelectedItems,
  TestTubes,
  TubeDistribution,
} from '@/modules/game/interfaces';
import getInitialBalls from '@/modules/game/helpers/get-initial-balls';
import getInitialTestTubes from '@/modules/game/helpers/get-initial-test-tubes';
import getInitialTubeDistribution from '@/modules/game/helpers/get-initial-tube-distribution';
import Tubes from '@/modules/game/components/tubes/tubes';
import updateBallsPosition from '@/modules/game/helpers/update-balls-position';
import RenderBalls from '@/modules/game/components/render-balls/render-balls';
import { INITIAL_SELECTED_ITEMS } from '@/modules/game/constants/game';
import validateSelectedTubes from '@/modules/game/helpers/validate-selected-tubes';

export interface ExtendedGameProps extends GameProps {
  handleNextLevel: (isNextLevel?: boolean) => void;
}

export default function Game({
  isSpecialLevel,
  level,
  size,
  tubes,
  capacity,
  distribution,
  handleNextLevel,
}: ExtendedGameProps) {
  const [balls, setBalls] = useState<Balls[]>(() => getInitialBalls(tubes));
  const [testTubes, setTestTubes] = useState<TestTubes[]>(() =>
    getInitialTestTubes(tubes, distribution, capacity, size),
  );
  const [tubeDistribution, setTubeDistribution] = useState<TubeDistribution>(
    () =>
      getInitialTubeDistribution({
        balls,
        capacity,
        distribution,
        testTubes,
      }),
  );
  const [selectedItems, setSelectedItems] = useState<SelectedItems>(
    INITIAL_SELECTED_ITEMS,
  );
  const tubesRef = useRef<CoordinateTube[]>([]);

  useEffect(() => {
    setBalls((data) => updateBallsPosition(data, tubesRef.current, size));
  }, [size, tubeDistribution]);

  function handleActions(type: HeaderActions): void {
    console.log(type);
  }

  function handleOnClick(indexSelectedTube: number): void {
    validateSelectedTubes({
      balls,
      indexSelectedTube,
      selectedItems,
      setBalls,
      setSelectedItems,
      size,
      testTubes,
      tubePositions: tubesRef.current,
    });
  }

  function handlePosition(index: number, data: CoordinateTube): void {
    tubesRef.current[index] = data;
  }

  return (
    <GameWrapper disableUI={false}>
      <GameHeader
        handleActions={handleActions}
        isSpecialLevel={isSpecialLevel}
        level={level}
        totalUndo={0}
        tubeHelpEnabled={tubeDistribution.isComplete}
      />
      <RenderBalls balls={balls} size={size} />
      <Tubes
        distribution={tubeDistribution.distribution}
        size={size}
        handleOnClick={handleOnClick}
        testTubes={testTubes}
        handlePosition={handlePosition}
      />
    </GameWrapper>
  );
}
