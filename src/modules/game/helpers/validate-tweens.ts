import cloneDeep from '@/modules/common/helpers/clone-deep';
import type { Balls, TestTubes, Tween } from '@/modules/game/interfaces';
import { INITIAL_TWEEN_BALLS } from '@/modules/game/constants/game';

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

  let updateBalls = false;
  let updateTubes = false;

  for (let i = 0; i < copyTween.tweens.length; i++) {
    const tweenCompleted =
      copyTween.tweens[i].filter((v) => v.completed).length ===
      copyTween.tweens.length;

    if (tweenCompleted) {
    }
  }

  copyTween.tweens = copyTween.tweens?.filter(
    (_, index) => !tweenCompletedIndex.includes(index),
  );

  const notCompleted = copyTween.tweens?.[0]?.find((v) => !v.completed);

  if (notCompleted) {
    copyBalls[notCompleted.ballIndex].x = notCompleted.x;
    copyBalls[notCompleted.ballIndex].y = notCompleted.y;
    copyBalls[notCompleted.ballIndex].animate = true;

    if (notCompleted.tweenIndex === 3) {
      copyBalls[notCompleted.ballIndex].bounce = true;
      copyBalls[notCompleted.ballIndex].positionTube =
        notCompleted.positionTube ?? 0;
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
  let finishedLevel = false;

  return {
    updateTubes,
    updateBalls,
    copyTestTubes,
    copyBalls,
    finishedLevel,
    copyTween: tweenFinished ? INITIAL_TWEEN_BALLS : copyTween,
  };
}
