import randomNumber from '@/modules/game/helpers/numbers';

/**
 * Function that generates a list of random indices for an array,
 * depending on the total number of random values required and
 * the size of the array...
 * @param total
 * @param arraySize
 * @returns
 */
export default function getUniqueRandomIndicesFromArray(
  total: number,
  arraySize: number,
): number[] {
  const indices: number[] = [];
  let tmpCounter = 0;

  if (total <= arraySize) {
    do {
      const index = randomNumber(0, arraySize - 1);

      if (!indices.includes(index)) {
        indices.push(index);

        if (indices.length === total) {
          break;
        }
      }

      tmpCounter++;

      // Prevent it from getting into an infinite loop
      if (tmpCounter === 100) {
        break;
      }
      // eslint-disable-next-line no-constant-condition
    } while (true);
  }

  return indices;
}
