interface ICharacter {
  id?: number;
  name: string;
  surname?: string;
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

interface IPath {
  path: string;
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

interface IParentState {
  value?: string;
  error: string | null;
  values?: {
    inputGenderFirst: boolean;
    inputGenderSecond: boolean;
    inputGenderThird: boolean;
  };
}

interface IHtmlElements {
  name: {
    ref: React.RefObject<HTMLInputElement>;
    name: string;
    type: string;
  };

  surname: {
    ref: React.RefObject<HTMLInputElement>;
    name: string;
    type: string;
  };

  date: {
    ref: React.RefObject<HTMLInputElement>;
    name: string;
    type: string;
  };

  img: {
    ref: React.RefObject<HTMLInputElement>;
    name: string;
    type: string;
  };

  select: {
    ref: React.RefObject<HTMLSelectElement>;
    name: string;
  };

  radio: {
    ref: React.RefObject<HTMLInputElement>;
    name: string;
    type: string;
    options: {
      male: React.RefObject<HTMLInputElement>;
      female: React.RefObject<HTMLInputElement>;
      'non-binary': React.RefObject<HTMLInputElement>;
    };
  };

  checkbox: {
    ref: React.RefObject<HTMLInputElement>;
    name: string;
    type: string;
    agreement: string;
  };

  submit: {
    ref: React.RefObject<HTMLInputElement>;
    name: string;
    type: string;
  };
}

interface IInputElement {
  ref: React.RefObject<HTMLInputElement>;
  name: string;
  type: string;
  agreement?: string;
}

interface IRadioElement {
  ref: React.RefObject<HTMLInputElement>;
  name: string;
  type: string;
  options: {
    male: React.RefObject<HTMLInputElement>;
    female: React.RefObject<HTMLInputElement>;
    'non-binary': React.RefObject<HTMLInputElement>;
  };
}

interface ISelectElement {
  ref: React.RefObject<HTMLSelectElement>;
  name: string;
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
    values: {
      inputGenderFirst: boolean;
      inputGenderSecond: boolean;
      inputGenderThird: boolean;
    };
    error: string | null;
  };
  inputCheckbox: {
    error: string | null;
  };

  cardsList: {
    error: null;
    cards: ICharacter[];
  };

  popup: {
    error: null;
    state: boolean;
  };

  inputSubmit: {
    error: null;
  };
}

interface IValueWithRef {
  male: string;
  female: string;
  'non-binary': string;
}

interface IInputsGenders {
  inputGender: {
    value: string;
    values: {
      [key: string]: boolean;
      inputGenderFirst: boolean;
      inputGenderSecond: boolean;
      inputGenderThird: boolean;
    };
    error: string | null;
  };
}
export {
  ICharacter,
  ICardProps,
  IPathes,
  IPath,
  IComponents,
  GenderInputs,
  GenderLabels,
  FormState,
  IValueWithRef,
  IInputsGenders,
  IHtmlElements,
  IParentState,
  IInputElement,
  ISelectElement,
  IRadioElement,
};
