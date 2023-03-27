interface ICharacter {
  id?: number;
  name: string;
  description?: string;
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

interface IComponents {
  [key: string]: React.ComponentType[];
}

interface GenderInputs {
  inputGenderFirst: boolean;
  inputGenderSecond: boolean;
  inputGenderThird: boolean;
}

interface GenderLabels {
  male: React.RefObject<HTMLInputElement>;
  female: React.RefObject<HTMLInputElement>;
  'non-binary': React.RefObject<HTMLInputElement>;
}

interface FormState {
  inputName: {
    error: string | null;
  };
  inputSurname: {
    error: string | null;
  };
  inputDate: {
    value: string;
    error: string | null;
  };
  inputImage: {
    value: string;
    error: string | null;
  };
  selectOccupation: {
    value: string;
    error: string | null;
  };
  inputGender: {
    value: string;
    error: string | null;
  };
  inputCheckbox: {
    values: {
      inputGenderFirst: boolean;
      inputGenderSecond: boolean;
      inputGenderThird: boolean;
    };
    error: string | null;
  };

  cardsList: {
    error: null;
    cards: ICharacter[];
  };
}

interface IValueWithRef {
  male: string;
  female: string;
  'non-binary': string;
}

export {
  ICharacter,
  ICardProps,
  IPathes,
  IRoute,
  IComponents,
  GenderInputs,
  GenderLabels,
  FormState,
  IValueWithRef,
};
