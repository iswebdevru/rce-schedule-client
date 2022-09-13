export const repeat = <T>(count: number, value: T) => {
  return Array(count)
    .fill(0)
    .map(() => value);
};
