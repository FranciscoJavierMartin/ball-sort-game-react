import type { HeaderActions } from '@/modules/common/constants/header';
import GameWrapper from '@/modules/game/components/game-wrapper/game-wrapper';
import Header from '@/modules/game/components/header/header';
import type { GameProps } from '@/modules/game/interfaces';

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
      <Header
        handleActions={handleActions}
        isSpecialLevel={isSpecialLevel}
        level={level}
        totalUndo={0}
        tubeHelpEnabled={false}
      />
    </GameWrapper>
  );
}
