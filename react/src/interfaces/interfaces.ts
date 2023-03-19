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

export default ICharacter;
