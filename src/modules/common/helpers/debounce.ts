// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const debounce = (fn: Function, delay: number) => {
  let t: number;
  return function () {
    clearTimeout(t);
    t = setTimeout(fn, delay);
  };
};
