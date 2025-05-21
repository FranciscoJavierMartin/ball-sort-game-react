import type {
  BallsInTestTubes,
  CounterColors,
  GameProps,
  TubesType,
} from '@/modules/game/interfaces';
import getUniqueRandomIndicesFromArray from '@/modules/game/helpers/unique-indices';
import COLORS_BALLS from '@/modules/common/constants/color';
import { BASE_SIZE } from '@/modules/game/constants/game';
import {
  getValueFromCache,
  savePropierties,
} from '@/modules/common/helpers/storage';
import { STORAGE_KEYS } from '@/modules/game/constants/storage';
import randomNumber from '@/modules/game/helpers/numbers';
import {
  RULES_LEVELS,
  SPECIAL_LEVELS,
} from '@/modules/game/constants/rules-levels';
import cloneDeep from '@/modules/common/helpers/clone-deep';

function getBaseValues(level = 0, showSpecial = false) {
  if (showSpecial) {
    const indexSpecialLevel = randomNumber(0, SPECIAL_LEVELS.length - 1);

    return {
      isIncognito: false,
      ...SPECIAL_LEVELS[indexSpecialLevel],
    };
  }

  const baseValidation = RULES_LEVELS.find(
    ({ validation }) => level >= validation.min && level <= validation.max,
  );

  const baseRules = baseValidation
    ? [baseValidation]
    : RULES_LEVELS.filter(({ validation }) => validation.noRange);

  const indexRule =
    baseRules.length === 1 ? 0 : randomNumber(0, baseRules.length - 1);

  const isIncognito =
    baseRules[indexRule].validation.incognito && level % 4 === 0
      ? !!randomNumber(0, 1)
      : false;

  const size = baseRules[indexRule].base.size || BASE_SIZE;

  return { isIncognito, size, ...baseRules[indexRule].base };
}

function getBallsByType(
  colors: CounterColors[],
  capacity: number,
  isIncognito = false,
): BallsInTestTubes[] {
  const selectedBalls: BallsInTestTubes[] = [];

  do {
    const index = randomNumber(0, colors.length - 1);
    const { counter, value } = colors[index];

    if (counter > 0) {
      let saveBall = true;

      const isLastBall = selectedBalls.length === capacity - 1;

      if (isLastBall) {
        saveBall = !selectedBalls.map((v) => v.value).every((v) => v === value);

        if (!saveBall) {
          const availableColors = colors.filter((v) => v.counter > 0);

          if (
            availableColors.length === 1 &&
            availableColors[0].counter === 1
          ) {
            console.log(
              'Level without a solution, another one must be recreated',
            );
            break;
          }
        }

        // 1 ball (red)
        // one tube red, red, red
      }

      if (saveBall) {
        const incognito = isIncognito && !isLastBall;
        selectedBalls.push({ value, incognito });

        colors[index].counter--;
      }

      if (selectedBalls.length === capacity) {
        break;
      }
    }
    // eslint-disable-next-line no-constant-condition
  } while (true);

  return selectedBalls;
}

function calculateDistribution(
  colors: CounterColors[],
  totalColors: number,
  capacity: number,
  totalTubes: number,
  isIncognito = false,
): TubesType {
  const tubes: TubesType = {};
  const copyColors = cloneDeep(colors);

  const fullTubeIndices = getUniqueRandomIndicesFromArray(
    totalColors,
    totalTubes,
  );

  for (const index of fullTubeIndices) {
    tubes[index] = { balls: getBallsByType(copyColors, capacity, isIncognito) };
  }

  const fullTubes = Object.keys(tubes).reduce(
    (a, s) => a + (tubes[s].balls?.length === capacity ? 1 : 0),
    0,
  );

  if (fullTubes !== totalColors) {
    return calculateDistribution(
      colors,
      totalColors,
      capacity,
      totalTubes,
      isIncognito,
    );
  }

  return tubes;
}

function getDistributionBallsTubes(
  totalColors: number,
  capacity: number,
  distribution: number[],
  isIncognito = false,
): TubesType {
  const totalTubes = distribution.reduce((a, s) => a + s, 0);

  const colors: CounterColors[] = getUniqueRandomIndicesFromArray(
    totalColors,
    COLORS_BALLS.length,
  ).map((value) => ({
    value,
    counter: capacity,
  }));

  const tubes: TubesType = calculateDistribution(
    colors,
    totalColors,
    capacity,
    totalTubes,
    isIncognito,
  );

  return tubes;
}

export default function generateLevel(isNextLevel = true): GameProps {
  let newLevel: GameProps;
  const previusLevel: number = getValueFromCache(STORAGE_KEYS.LEVEL, 0);
  const isSpecialPreviusLevel: boolean = getValueFromCache(
    STORAGE_KEYS.IS_SPECIALLEVEL,
    false,
  );

  const nextLevel = previusLevel + (isNextLevel ? 1 : 0);

  const isSpecialLevel = nextLevel % 5 === 0 && !isSpecialPreviusLevel;
  const level = isSpecialLevel ? previusLevel : nextLevel;

  if (level === 1) {
    const value = getUniqueRandomIndicesFromArray(1, COLORS_BALLS.length)[0];

    newLevel = {
      size: BASE_SIZE,
      distribution: [2],
      capacity: 4,
      level: 1,
      isSpecialLevel: false,
      tubes: {
        '0': { balls: [{ value }] },
        '1': { balls: [{ value }, { value }, { value }] },
      },
    };
  } else {
    const {
      capacity,
      totalColors,
      distribution,
      isIncognito = false,
      size,
    } = getBaseValues(level, isSpecialLevel);

    const tubes = getDistributionBallsTubes(
      totalColors,
      capacity,
      distribution,
      isIncognito,
    );

    newLevel = {
      size,
      distribution,
      capacity,
      level,
      isSpecialLevel,
      tubes,
    };
  }

  Object.keys(newLevel).forEach((v) =>
    savePropierties(v, newLevel[v as never]),
  );

  savePropierties(STORAGE_KEYS.LEVEL_COMPLETED, false);

  return newLevel;
}
