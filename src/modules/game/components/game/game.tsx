import { useState } from 'react';
import type { HeaderActions } from '@/modules/common/constants/header';
import GameWrapper from '@/modules/game/components/game-wrapper/game-wrapper';
import GameHeader from '@/modules/game/components/game-header/game-header';
import type {
  Balls,
  Coordinate,
  GameProps,
  TestTubes,
} from '@/modules/game/interfaces';
import Ball from '@/modules/game/components/ball/ball';
import COLORS_BALLS from '@/modules/common/constants/color';
import Tube from '@/modules/game/components/tube/tube';
import getStyles from '@/modules/game/helpers/styles';
import getInitialBalls from '@/modules/game/helpers/get-initial-balls';
import getInitialTestTubes from '@/modules/game/helpers/get-initial-test-tubes';

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

  function handleActions(type: HeaderActions): void {
    console.log(type);
  }

  function handleOnClick(indexSelectedTube: number): void {
    console.log('onClick', indexSelectedTube);
  }

  function handlePosition(index: number, data: Coordinate): void {
    console.log('handlePosition', { index, data });
  }

  return (
    <GameWrapper disableUI={false}>
      <GameHeader
        handleActions={handleActions}
        isSpecialLevel={isSpecialLevel}
        level={level}
        totalUndo={0}
        tubeHelpEnabled={false}
      />
      {/* <Ball size={size} colors={COLORS_BALLS[0]} x={100} y={200} /> */}
      {/* <Tube
        style={getStyles(size, capacity)}
        handleOnClick={handleOnClick}
        handlePosition={handlePosition}
        index={0}
      /> */}
    </GameWrapper>
  );
}
