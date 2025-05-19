import type {
  TestTubes,
  TubeDistribution,
  Balls,
} from '@/modules/game/interfaces';

export function validateLastTubeHelp(
  testTubes: TestTubes[],
  balls: Balls[],
  capacity: number,
): boolean {
  const lastTube = testTubes[testTubes.length - 1];
  const totalTubesFill = [...new Set(balls.map((ball) => ball.color))].length;
  const totalTubes = testTubes.length;

  const minimumTubeValue: boolean =
    totalTubes + 1 <= totalTubesFill + 3 || lastTube.capacity < capacity;

  return minimumTubeValue;
}

export default function getInitialTubeDistribution({
  balls,
  capacity,
  distribution,
  testTubes,
}: {
  balls: Balls[];
  capacity: number;
  distribution: number[];
  testTubes: TestTubes[];
}): TubeDistribution {
  const minimumTubeValue = validateLastTubeHelp(testTubes, balls, capacity);

  const newDistribution: TubeDistribution = {
    distribution,
    isComplete: !minimumTubeValue,
  };

  return newDistribution;
}
