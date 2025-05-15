import type { HeaderActions } from '@/modules/common/constants/header';
import GameWrapper from '@/modules/game/components/game-wrapper/game-wrapper';
import GameHeader from '@/modules/game/components/game-header/game-header';
import type { GameProps } from '@/modules/game/interfaces';
import Ball from '@/modules/game/components/ball/ball';
import COLORS_BALLS from '@/modules/common/constants/color';
import lightenDarkenColor from '@/modules/game/helpers/color';

export interface ExtendedGameProps extends GameProps {
  handleNextLevel: (isNextLevel: boolean) => void;
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
  function handleActions(type: HeaderActions): void {
    console.log(type);
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
      <Ball
        size={size}
        colors={[COLORS_BALLS[0], lightenDarkenColor(COLORS_BALLS[0], 100)]}
        x={100}
        y={200}
      />
      <Ball
        incognito
        size={size}
        colors={[COLORS_BALLS[0], lightenDarkenColor(COLORS_BALLS[0], 100)]}
        x={200}
        y={200}
      />
    </GameWrapper>
  );
}
