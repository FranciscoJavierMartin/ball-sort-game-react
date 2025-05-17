import { useEffect, useRef, useState } from 'react';
import {
  HEADER_ACTIONS,
  type HeaderActions,
} from '@/modules/common/constants/header';
import GameWrapper from '@/modules/game/components/game-wrapper/game-wrapper';
import GameHeader from '@/modules/game/components/game-header/game-header';
import type {
  Tween,
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
import {
  INITIAL_SELECTED_ITEMS,
  INITIAL_TWEEN_BALLS,
} from '@/modules/game/constants/game';
import validateSelectedTubes from '@/modules/game/helpers/validate-selected-tubes';
import delay from '@/modules/common/helpers/delay';
import { SPEED_ANIMATION } from '@/modules/common/constants/size';
import validateTweens from '@/modules/game/helpers/validate-tweens';
import LevelCompleted from '@/modules/game/components/level-completed/level-completed';

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
  const [tweenBalls, setTweenBalls] = useState<Tween>(INITIAL_TWEEN_BALLS);
  const [levelCompleted, setLevelCompleted] = useState<boolean>(false);
  const tubesRef = useRef<CoordinateTube[]>([]);
  const disableUI = tweenBalls.tubes.origin >= 0;

  useEffect(() => {
    setBalls((data) => updateBallsPosition(data, tubesRef.current, size));
  }, [size, tubeDistribution]);

  useEffect(() => {
    if (tweenBalls.tweens.length !== 0) {
      const runAsync = async () => {
        const {
          copyBalls,
          copyTestTubes,
          copyTween,
          finishedLevel,
          updateBalls,
          updateTubes,
        } = validateTweens({
          balls,
          capacity,
          testTubes,
          tweenBalls,
        });

        await delay(SPEED_ANIMATION);
        if (updateBalls) {
          setBalls(copyBalls);
        }

        if (updateTubes) {
          setTestTubes(copyTestTubes);
        }

        if (finishedLevel) {
          setLevelCompleted(true);
        }

        setTweenBalls(copyTween);
      };

      runAsync();
    }
  }, [tweenBalls, balls, testTubes, capacity]);

  function handleActions(type: HeaderActions): void {
    switch (type) {
      case HEADER_ACTIONS.RESTART:
        handleNextLevel(false);
        break;
      case HEADER_ACTIONS.HOME:
        break;
      case HEADER_ACTIONS.TUBE:
        break;
      case HEADER_ACTIONS.UNDO:
        break;
    }
  }

  function handleOnClick(indexSelectedTube: number): void {
    validateSelectedTubes({
      balls,
      indexSelectedTube,
      selectedItems,
      setBalls,
      setSelectedItems,
      setTweenBalls,
      size,
      testTubes,
      tubePositions: tubesRef.current,
    });
  }

  function handlePosition(index: number, data: CoordinateTube): void {
    tubesRef.current[index] = data;
  }

  return (
    <GameWrapper disableUI={disableUI}>
      {levelCompleted && <LevelCompleted handleNextLevel={handleNextLevel} />}
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
