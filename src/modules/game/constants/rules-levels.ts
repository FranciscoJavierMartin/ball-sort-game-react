import { BASE_SIZE } from '@/modules/game/constants/game';

export const RULES_LEVELS = [
  {
    validation: { min: 2, max: 4 },
    base: { capacity: 4, totalColors: 2, distribution: [3] },
  },
  {
    validation: { min: 5, max: 10, noRange: true },
    base: { capacity: 4, totalColors: 3, distribution: [5] },
  },
  {
    validation: { min: 11, max: 20, noRange: true, incognito: true },
    base: { capacity: 4, totalColors: 5, distribution: [7] },
  },
  {
    validation: { min: 21, max: 30, noRange: true, incognito: true },
    base: { capacity: 4, totalColors: 7, distribution: [5, 4] },
  },
  {
    validation: { min: 31, max: 40, noRange: true, incognito: true },
    base: { capacity: 4, totalColors: 9, distribution: [6, 5], size: 30 },
  },
  {
    validation: { min: 41, max: 50, noRange: true, incognito: true },
    base: { capacity: 6, totalColors: 4, distribution: [4, 2], size: 30 },
  },
  {
    validation: { min: 51, max: 60, noRange: true, incognito: true },
    base: { capacity: 4, totalColors: 11, distribution: [5, 5, 3], size: 25 },
  },
];

export const SPECIAL_LEVELS = [
  { capacity: 6, totalColors: 6, distribution: [8], size: 30 },
  { capacity: 8, totalColors: 4, distribution: [6], size: BASE_SIZE },
];
