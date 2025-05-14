import Game, {
  type ExtendedGameProps,
} from '@/modules/game/components/game/game';

export default function GamePage() {
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

  return <Game level={level30} />;
}
