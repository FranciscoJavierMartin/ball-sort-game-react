import cloneDeep from '@/modules/common/helpers/clone-deep';
import type {
  Balls,
  SelectedItems,
  TestTubes,
  TubeDistribution,
} from '@/modules/game/interfaces';
import { validateLastTubeHelp } from '@/modules/game/helpers/get-initial-tube-distribution';
import getStyles from '@/modules/game/helpers/styles';
import { savePropierties } from '@/modules/common/helpers/storage';
import { STORAGE_KEYS } from '@/modules/game/constants/storage';
import { saveNewTubeDistributionCache } from '@/modules/game/helpers/storage';

export default function validateTubeHelp({
  balls,
  capacity,
  size,
  testTubes,
  tubeDistribution,
  setSelectedItems,
  setTestTubes,
  setTubeDistribution,
}: {
  balls: Balls[];
  capacity: number;
  size: number;
  testTubes: TestTubes[];
  tubeDistribution: TubeDistribution;
  setSelectedItems: React.Dispatch<React.SetStateAction<SelectedItems>>;
  setTestTubes: React.Dispatch<React.SetStateAction<TestTubes[]>>;
  setTubeDistribution: React.Dispatch<React.SetStateAction<TubeDistribution>>;
}): void {
  const copyTubeDistribution = cloneDeep(tubeDistribution);
  const minimumTubeValue = validateLastTubeHelp(testTubes, balls, capacity);
  copyTubeDistribution.isComplete = !minimumTubeValue;

  if (minimumTubeValue) {
    const copyTestTubes = cloneDeep(testTubes);
    const lastTube = copyTestTubes[copyTestTubes.length - 1];

    if (lastTube.capacity < capacity) {
      copyTestTubes[lastTube.index].capacity++;
      copyTestTubes[lastTube.index].style = getStyles(
        size,
        copyTestTubes[lastTube.index].capacity,
      );
    } else {
      copyTubeDistribution.distribution[
        copyTubeDistribution.distribution.length - 1
      ]++;

      savePropierties(
        STORAGE_KEYS.DISTRIBUTION,
        copyTubeDistribution.distribution,
      );

      copyTestTubes.push({
        balls: [],
        capacity: 1,
        index: copyTestTubes.length,
        isComplete: false,
        showConfetti: false,
        style: getStyles(size, 1),
      });
    }

    setTestTubes(copyTestTubes);
    setTubeDistribution(copyTubeDistribution);
    saveNewTubeDistributionCache(copyTestTubes, balls);
  }

  setTubeDistribution(copyTubeDistribution);
}
