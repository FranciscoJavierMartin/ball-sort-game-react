import type { TestTubes, TubesType } from '@/modules/game/interfaces';
import getStyles from '@/modules/game/helpers/styles';

export default function getInitialTestTubes(
  tubes: TubesType,
  distribution: number[],
  capacity: number,
  size: number,
): TestTubes[] {
  const totalTubes: number = distribution.reduce((acc, curr) => acc + curr, 0);
  const newTestTubes: TestTubes[] = [];

  for (let i = 0, indexBase = 0; i < totalTubes; i++) {
    const balls = (tubes[i]?.balls || []).map<number>(
      (_, ballIndex) => ballIndex + indexBase,
    );
    const tubeCapacity: number = tubes[i]?.capacity || capacity;
    const isComplete: boolean = tubes[i]?.isComplete || false;
    indexBase += balls.length;

    newTestTubes.push({
      balls,
      capacity: tubeCapacity,
      index: i,
      isComplete,
      showConfetti: false,
      style: getStyles(size, tubeCapacity),
    });
  }
  return newTestTubes;
}
