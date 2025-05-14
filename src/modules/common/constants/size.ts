export const BASE_HEIGHT = 732;
export const BASE_WIDTH = 412;
// Percentage to be added to the tube for the width...
export const WIDTH_PADDING_PERCENTAGE = 0.4;
// The additional value that will be added to the height of the tube...
export const HEIGHT_OFFSET_PERCENTAGE = 0.95;

document.documentElement.style.setProperty('--base-height', `${BASE_HEIGHT}px`);
document.documentElement.style.setProperty('--base-width', `${BASE_WIDTH}px`);
