import Game, {
  type ExtendedGameProps,
} from '@/modules/game/components/game/game';

export default function GamePage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const level1: ExtendedGameProps = {
    size: 35,
    distribution: [2],
    capacity: 4,
    level: 1,
    isSpecialLevel: false,
    tubes: {
      '0': { balls: [{ value: 5 }] },
      '1': { balls: [{ value: 5 }, { value: 5 }, { value: 5 }] },
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleNextLevel: (isNextLevel = false) => {},
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const level30: ExtendedGameProps = {
    capacity: 4,
    distribution: [5, 4],
    isSpecialLevel: false,
    level: 30,
    size: 35,
    tubes: {
      '0': {
        balls: [
          { value: 1, incognito: false },
          { value: 8, incognito: false },
          { value: 1, incognito: false },
          { value: 6, incognito: false },
        ],
      },
      '1': {
        balls: [
          { value: 4, incognito: false },
          { value: 8, incognito: false },
          { value: 1, incognito: false },
          { value: 4, incognito: false },
        ],
      },
      '2': {
        balls: [
          { value: 5, incognito: false },
          { value: 5, incognito: false },
          { value: 9, incognito: false },
          { value: 6, incognito: false },
        ],
      },
      '3': {
        balls: [
          { value: 1, incognito: false },
          { value: 9, incognito: false },
          { value: 9, incognito: false },
          { value: 8, incognito: false },
        ],
      },
      '4': {
        balls: [
          { value: 5, incognito: false },
          { value: 5, incognito: false },
          { value: 6, incognito: false },
          { value: 4, incognito: false },
        ],
      },
      '6': {
        balls: [
          { value: 4, incognito: false },
          { value: 7, incognito: false },
          { value: 6, incognito: false },
          { value: 8, incognito: false },
        ],
      },
      '8': {
        balls: [
          { value: 7, incognito: false },
          { value: 7, incognito: false },
          { value: 7, incognito: false },
          { value: 9, incognito: false },
        ],
      },
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleNextLevel: (isNextLevel = false) => {},
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const level31: ExtendedGameProps = {
    capacity: 4,
    distribution: [6, 6],
    isSpecialLevel: false,
    level: 31,
    size: 35,
    tubes: {
      '0': {
        balls: [
          { value: 4, incognito: false },
          { value: 8, incognito: false },
          { value: 10, incognito: false },
          { value: 10, incognito: false },
        ],
      },
      '1': {
        balls: [
          { value: 6, incognito: false },
          { value: 2, incognito: false },
          { value: 2, incognito: false },
        ],
      },
      '2': {
        balls: [
          { value: 4, incognito: false },
          { value: 4, incognito: false },
          { value: 4, incognito: false },
        ],
      },
      '3': {
        balls: [{ value: 2, incognito: false }],
      },
      '4': {
        balls: [
          { value: 7, incognito: false },
          { value: 7, incognito: false },
          { value: 7, incognito: false },
          { value: 7, incognito: false },
        ],
      },
      '5': {
        balls: [
          { value: 3, incognito: false },
          { value: 11, incognito: false },
          { value: 8, incognito: false },
          { value: 11, incognito: false },
        ],
      },
      '6': {
        balls: [
          { value: 11, incognito: false },
          { value: 11, incognito: false },
          { value: 8, incognito: false },
        ],
      },
      '7': {
        balls: [
          { value: 1, incognito: false },
          { value: 1, incognito: false },
          { value: 1, incognito: false },
          { value: 1, incognito: false },
        ],
      },
      '8': {
        balls: [
          { value: 6, incognito: false },
          { value: 8, incognito: false },
          { value: 10, incognito: false },
          { value: 10, incognito: false },
        ],
      },
      '9': {
        balls: [
          { value: 2, incognito: false },
          { value: 3, incognito: false },
          { value: 3, incognito: false },
          { value: 3, incognito: false },
        ],
      },
      '11': {
        balls: [
          { value: 6, incognito: false },
          { value: 6, incognito: false },
        ],
      },
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleNextLevel: (isNextLevel = false) => {},
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const level32: ExtendedGameProps = {
    size: 30,
    distribution: [6, 5],
    capacity: 4,
    level: 32,
    isSpecialLevel: false,
    tubes: {
      '0': {
        balls: [
          { value: 10, incognito: true },
          { value: 2, incognito: true },
          { value: 1, incognito: true },
          { value: 4, incognito: false },
        ],
      },
      '1': {
        balls: [
          { value: 8, incognito: true },
          { value: 0, incognito: true },
          { value: 8, incognito: true },
          { value: 0, incognito: false },
        ],
      },
      '2': {
        balls: [
          { value: 6, incognito: true },
          { value: 4, incognito: true },
          { value: 5, incognito: true },
          { value: 1, incognito: false },
        ],
      },
      '3': {
        balls: [
          { value: 4, incognito: true },
          { value: 6, incognito: true },
          { value: 2, incognito: true },
          { value: 10, incognito: false },
        ],
      },
      '4': {
        balls: [
          { value: 3, incognito: true },
          { value: 10, incognito: true },
          { value: 3, incognito: true },
          { value: 6, incognito: false },
        ],
      },
      '5': {
        balls: [
          { value: 10, incognito: true },
          { value: 5, incognito: true },
          { value: 1, incognito: true },
          { value: 2, incognito: false },
        ],
      },
      '7': {
        balls: [
          { value: 8, incognito: true },
          { value: 8, incognito: true },
          { value: 0, incognito: true },
          { value: 0, incognito: false },
        ],
      },
      '8': {
        balls: [
          { value: 5, incognito: true },
          { value: 4, incognito: true },
          { value: 2, incognito: true },
          { value: 5, incognito: false },
        ],
      },
      '10': {
        balls: [
          { value: 6, incognito: true },
          { value: 3, incognito: true },
          { value: 1, incognito: true },
          { value: 3, incognito: false },
        ],
      },
    },
    handleNextLevel: (isNextLevel = false) => {},
  };

  return <Game {...level32} />;
}
