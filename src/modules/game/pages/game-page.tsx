import { lazy, Suspense, useState } from 'react';
import type { GameProps } from '@/modules/game/interfaces';
import generateLevel from '@/modules/game/helpers/generate-level';
import Loading from '@/modules/common/components/loading/loading';
import { getLevelFromCache } from '@/modules/game/helpers/storage';

const Game = lazy(() => import('@/modules/game/components/game/game'));

export default function GamePage() {
  const [level, setLevel] = useState<GameProps>(() => getLevelFromCache());

  function handleNextLevel(isNextLevel = true) {
    console.log('handleNextLevel', isNextLevel);
  }

  return (
    <Suspense fallback={<Loading />}>
      <Game {...level} handleNextLevel={handleNextLevel} />
    </Suspense>
  );
}
