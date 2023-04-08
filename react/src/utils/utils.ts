import { apiUrl } from '../constants/constants';
import { ICharacter, IInputsGenders } from '../models/interfaces';

const capitalizeFirstLetter = (str: string): string =>
  str.length > 0 ? `${str[0].toUpperCase()}${str.slice(1)}` : '';

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

class Validation {
  validateCheckbox = (checkbox: HTMLInputElement) => {
    return checkbox.checked
      ? { inputCheckbox: { value: checkbox.value, error: null } }
      : { inputCheckbox: { value: '', error: 'Please accept the agreement!' } };
  };

  validateName = (name: string) => {
    return name.length > 3 && name[0] === name[0].toUpperCase()
      ? { inputName: { error: null } }
      : { inputName: { error: 'Please check your name!' } };
  };

  validateSurname = (surname: string) => {
    if (surname.length === 0) {
      return { inputSurname: { error: null } };
    }
    const surnameWithNoSpaces = surname.replaceAll(' ', '');
    const isSurnameValid = /^[a-zA-Z]+$/.test(surnameWithNoSpaces);
    return isSurnameValid &&
      surname.length > 3 &&
      surnameWithNoSpaces[0] === surnameWithNoSpaces[0].toUpperCase()
      ? { inputSurname: { error: null } }
      : { inputSurname: { error: 'Please check your surname!' } };
  };

  validateDate = (date: string) => {
    const [year, month, day] = date.split('-');
    return +day > 0 &&
      +day <= 31 &&
      +month > 0 &&
      +month <= 12 &&
      +year > 0 &&
      +year <= new Date().getFullYear()
      ? { inputDate: { error: null } }
      : { inputDate: { error: 'Please enter a valid date!' } };
  };

  validateImage = (fileList: FileList): string | boolean => {
    if (fileList.length === 0) {
      return 'Please attach your image!';
    }

    const [image] = fileList;
    const { size, type } = image;

    return size < 10 * 1000000 && type.includes('image/')
      ? true
      : 'Please check your size or type of your image!';
  };

  validateOccupation = (value: string) => {
    return value === 'Choose occupation'
      ? { selectOccupation: { value: 'Choose occupation', error: 'Please enter occupation!' } }
      : { selectOccupation: { value: value, error: null } };
  };

  validateGender = (genders: HTMLInputElement[]) => {
    const checkedGender = genders.filter((gender) => gender.checked)[0];

    const inputsGenders: IInputsGenders = {
      inputGender: {
        value: '',
        values: {
          inputGenderFirst: false,
          inputGenderSecond: false,
          inputGenderThird: false,
        },
        error: null,
      },
    };

    if (!checkedGender) {
      inputsGenders.inputGender.error = 'Please choose gender!';
      return inputsGenders;
    }

    const valueWithRef = {
      male: 'inputGenderFirst',
      female: 'inputGenderSecond',
      'non-binary': 'inputGenderThird',
    };

    inputsGenders.inputGender.values[
      valueWithRef[checkedGender.value as keyof typeof valueWithRef]
    ] = true;

    inputsGenders.inputGender.value = checkedGender.value;

    return inputsGenders;
  };
}

const saveToLocalStore = (inputValue: string): void => {
  localStorage.setItem('inputValue', inputValue);
};

class Api {
  private url: string;

  constructor(url = apiUrl) {
    this.url = url;
  }

  public async getCharacters(name: string): Promise<ICharacter[]> {
    const response: Response = await fetch(
      name === '' ? `${this.url}/characters` : `${this.url}/characters/?name=${name}`
    );
    return response.json();
  }
}

const generateArr = (length: number): number[] => [...Array(length)].map(() => 0);

export { capitalizeFirstLetter, idGenerator, Validation, saveToLocalStore, Api, generateArr };
