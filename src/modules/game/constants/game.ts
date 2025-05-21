import type { SelectedItems, Tween } from '@/modules/game/interfaces';

export const INITIAL_SELECTED_ITEMS: SelectedItems = {
  originTubeIndex: -1,
  originBallIndex: -1,
};

export const INITIAL_TWEEN_BALLS: Tween = {
  tweens: [],
  tubes: { origin: -1, destinity: -1 },
};

export const BASE_SIZE = 35;
