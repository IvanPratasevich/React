const capitalizeFirstLetter = (str: string): string => `${str[0].toUpperCase()}${str.slice(1)}`;

const randomNumberGenerator = (from: number, to: number): number =>
  Math.floor(Math.random() * to) + from;

const idGenerator = (): string => {
  const alphabet = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  return `${randomNumberGenerator(0, 9)}${alphabet[randomNumberGenerator(0, alphabet.length - 1)]}${
    alphabet[randomNumberGenerator(0, alphabet.length - 1)]
  }${randomNumberGenerator(0, 9)}${randomNumberGenerator(0, 9)}`;
};

export { capitalizeFirstLetter, idGenerator };
