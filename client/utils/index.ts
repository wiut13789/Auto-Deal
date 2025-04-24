export const generateYears = (from: number, to: number) => {
  const years = [];

  for (let i = from; i <= to; i++) {
    years.push(i);
  }

  return years;
};
