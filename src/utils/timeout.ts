export const timeout = (time: number) => {
  return new Promise(() => {
    setTimeout(() => time);
  });
};
