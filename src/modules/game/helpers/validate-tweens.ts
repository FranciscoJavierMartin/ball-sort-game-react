import cloneDeep from '@/modules/common/helpers/clone-deep';
import type { Balls, TestTubes, Tween } from '@/modules/game/interfaces';
import { INITIAL_TWEEN_BALLS } from '@/modules/game/constants/game';
import validateCompleteTube from '@/modules/game/helpers/validate-complete-tube';

function validateLevelComplete(tubes: TestTubes[]): boolean {
  const totalTubes = tubes.length;
  const totalTubesCompleted: number = tubes.reduce<number>(
    (acc, tube) => acc + (tube.isComplete ? 1 : 0),
    0,
  );
  const totalEmptyTubes = tubes.reduce<number>(
    (acc, tube) => (acc + tube.balls.length === 0 ? 1 : 0),
    0,
  );

  return totalTubes === totalTubesCompleted + totalEmptyTubes;
}

export default function validateTweens({
  balls,
  capacity,
  testTubes,
  tweenBalls,
}: {
  balls: Balls[];
  testTubes: TestTubes[];
  tweenBalls: Tween;
  capacity: number;
}) {
  const copyTween = cloneDeep(tweenBalls);
  const copyBalls = cloneDeep(balls);
  const copyTestTubes = cloneDeep(testTubes);
  const tweenCompletedIndex: number[] = [];

  let updateBalls: boolean = false;
  let updateTubes: boolean = false;

  for (let i = 0; i < copyTween.tweens.length; i++) {
    const tweenCompleted =
      copyTween.tweens[i].filter((v) => v.completed).length ===
      copyTween.tweens[i].length;

    if (tweenCompleted) {
      tweenCompletedIndex.push(i);
      const ballIndex = copyTween.tweens[i][0].ballIndex;
      copyTestTubes[copyTween.tubes.destinity].balls.push(ballIndex);
      const completeTube = validateCompleteTube(
        copyTestTubes[copyTween.tubes.destinity],
        copyBalls,
        capacity,
      );

      copyTestTubes[copyTween.tubes.destinity].isComplete = completeTube;
      copyTestTubes[copyTween.tubes.destinity].showConfetti = completeTube;

      copyTestTubes[copyTween.tubes.origin].balls.pop();
      copyTestTubes[copyTween.tubes.origin].isComplete = false;
      copyTestTubes[copyTween.tubes.origin].showConfetti = false;

      copyBalls[ballIndex].indexTube = copyTween.tubes.destinity;
      copyBalls[ballIndex].animate = false;

      updateBalls = true;
      updateTubes = true;
    }
  }

  copyTween.tweens = copyTween.tweens?.filter(
    (_, i) => !tweenCompletedIndex.includes(i),
  );

  const notCompleted = copyTween.tweens?.[0]?.find((v) => !v.completed);

  if (notCompleted) {
    copyBalls[notCompleted.ballIndex].x = notCompleted.x;
    copyBalls[notCompleted.ballIndex].y = notCompleted.y;
    copyBalls[notCompleted.ballIndex].animate = true;

    if (notCompleted.tweenIndex === 3) {
      copyBalls[notCompleted.ballIndex].bounce = true;
      copyBalls[notCompleted.ballIndex].positionTube =
        notCompleted?.positionTube ?? 0;
    }

    copyTween.tweens[0][notCompleted.tweenIndex - 1].completed = true;
    let previusTweenIndex = notCompleted.tweenIndex;

    updateBalls = true;

    for (let i = 1; i < copyTween.tweens.length; i++) {
      if (previusTweenIndex === 2 || previusTweenIndex === 3) {
        const nextIndex = previusTweenIndex === 2 ? 0 : 1;
        const nextTween = copyTween.tweens[i][nextIndex];

        copyBalls[nextTween.ballIndex].x = nextTween.x;
        copyBalls[nextTween.ballIndex].y = nextTween.y;
        copyBalls[nextTween.ballIndex].bounce = false;
        copyBalls[nextTween.ballIndex].animate = true;

        copyTween.tweens[i][nextIndex].completed = true;
        previusTweenIndex = copyTween.tweens[i][nextIndex].tweenIndex;
      }
    }
  }

  const tweenFinished = copyTween.tweens.length === 0;
  const finishedLevel = validateLevelComplete(copyTestTubes);

  return {
    updateTubes,
    updateBalls,
    copyTestTubes,
    copyBalls,
    finishedLevel,
    copyTween: tweenFinished ? INITIAL_TWEEN_BALLS : copyTween,
  };
}
