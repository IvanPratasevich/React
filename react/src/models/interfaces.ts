interface ICharacter {
  id: number;
  name: string;
  description: string;
  img: string;
  gender: string;
  occupation: string;
  dateOfBirth: string | number;
  age: number | string;
}

interface ICardProps {
  character: ICharacter;
  key: string;
  hiddenData: string[];
}

interface IPathes {
  [key: string]: string;
}

interface IRoute {
  route: string;
}

export { ICharacter, ICardProps, IPathes, IRoute };
