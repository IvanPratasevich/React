const capitalizeFirstLetter = (str: string): string =>
  str.length > 0 ? `${str[0].toUpperCase()}${str.slice(1)}` : '';

const generateArr = (length: number): number[] => [...Array(length)].map(() => 0);

export { capitalizeFirstLetter, generateArr };
