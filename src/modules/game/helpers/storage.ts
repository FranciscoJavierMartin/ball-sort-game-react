import COLORS_BALLS from '@/modules/common/constants/color';
import {
  getDataCache,
  getValueFromCache,
  savePropierties,
} from '@/modules/common/helpers/storage';
import { STORAGE_KEYS } from '@/modules/game/constants/storage';
import generateLevel from '@/modules/game/helpers/generate-level';
import type {
  Balls,
  BallsInTestTubes,
  GameProps,
  TestTubes,
  TubesType,
} from '@/modules/game/interfaces';

function validateLevelFromCache({
  capacity = 0,
  level = 0,
  size = 0,
  distribution = [],
  tubes = {},
}: GameProps): boolean {
  try {
    const isValidCapacity =
      capacity >= 4 && capacity <= 10 && capacity % 2 === 0;
    const isValidLevelNumber = level >= 1;
    const isValidSize = [25, 30, 35].includes(size);
    const isValidDistribution =
      distribution.length !== 0 && distribution.every((v) => v >= 1 && v <= 9);
    const hasTubes = Object.keys(tubes).length !== 0;

    const balls = [
      ...new Set(
        Object.keys(tubes)
          .map((v) => tubes[v].balls?.map((ball) => ball.value))
          .flat(),
      ),
    ] as number[];

    const totalTubes = isValidDistribution
      ? distribution.reduce((a, s) => a + s, 0)
      : 0;

    const totalBalls = balls.length;
    const totalColors = COLORS_BALLS.length;

    const isValidBallColors =
      balls.reduce((a, s) => a + (s >= 0 && s < totalColors ? 1 : 0), 0) ===
      totalBalls;

    const isValidTubes = totalTubes > totalBalls;

    return (
      hasTubes &&
      isValidCapacity &&
      isValidBallColors &&
      isValidLevelNumber &&
      isValidSize &&
      isValidTubes
    );
  } catch {
    return false;
  }
}

export function getLevelFromCache(): GameProps {
  const isLevelCompleted: boolean = getValueFromCache(
    STORAGE_KEYS.LEVEL_COMPLETED,
    false,
  );

  if (!isLevelCompleted) {
    const data: GameProps = getDataCache();
    const isValidLevel = validateLevelFromCache(data);

    return isValidLevel ? data : generateLevel();
  }

  return generateLevel();
}

export function saveNewTubeDistributionCache(
  tubes: TestTubes[],
  balls: Balls[],
): void {
  const tubesInCache: TubesType = {};

  for (let i = 0; i < tubes.length; i++) {
    const ballsInTubes: BallsInTestTubes[] = [];

    if (tubes[i].balls.length) {
      for (let c = 0; c < tubes[i].balls.length; c++) {
        const ballIndex = tubes[i].balls[c];

        ballsInTubes.push({
          value: balls[ballIndex].color,
          incognito: balls[ballIndex].incognito,
        });
      }
    }

    tubesInCache[i] = {
      balls: ballsInTubes,
      capacity: tubes[i].capacity,
      isComplete: tubes[i].isComplete,
    };
  }

  savePropierties(STORAGE_KEYS.TUBES, tubesInCache);
}
