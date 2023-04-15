import { GIFObject } from 'giphy-api';

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
  preview: boolean;
  modalMode: boolean;
  setStateModal?: React.Dispatch<
    React.SetStateAction<{
      showModal: boolean;
      card: ICharacter | null;
    }>
  >;
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

interface IHtmlElements {
  name: {
    name: string;
    type: string;
    validation: {
      required?: string;
      minLength?: {
        value: number;
        message: string;
      };
      pattern?: {
        value: RegExp;
        message: string;
      };
    };
  };
  surname: {
    name: string;
    type: string;
    validation: {
      minLength: {
        value: number;
        message: string;
      };
      pattern: {
        value: RegExp;
        message: string;
      };
    };
  };
  date: {
    name: string;
    type: string;
    validation: {
      required: string;
    };
  };
  img: {
    name: string;
    type: string;
    validation: {
      required: string;
      validate: (file: FileList) => boolean | string;
    };
  };
  select: {
    name: string;
    validation: {
      validate: (data: string) => true | string;
    };
  };
  radio: {
    name: string;
    type: string;
    options: {
      [key: string]: string;
    };
    validation: {
      required: string;
    };
  };
  checkbox: {
    name: string;
    type: string;
    agreement: string;
    validation: {
      required: string;
    };
  };
  submit: {
    name: string;
    type: string;
  };
}

interface IInputElement {
  name: string;
  type: string;
  validation?: {
    required?: string;
    minLength?: {
      value: number;
      message: string;
    };
    pattern?: {
      value: RegExp;
      message: string;
    };
  };
  agreement?: string;
}

interface IRadioElement {
  name: string;
  type: string;
  options: {
    [key: string]: string;
  };
  validation: {
    required: string;
  };
}

interface ISelectElement {
  name: string;
  validation: {
    validate: (data: string) => true | string;
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

interface IFormState {
  cards: ICharacter[];
  showPopup: boolean;
  occupation: string;
}

interface IFields {
  name: string;
  surname: string;
  date: string;
  image: FileList;
  occupation: string;
  radio: string;
  checkbox: boolean;
  submit: string;
}

interface IGiphyResponse {
  data: GIFObject;
}

interface IErrorResponse {
  statusCode: number;
  message: string;
}

export {
  ICharacter,
  ICardProps,
  IPathes,
  IPath,
  IComponents,
  GenderInputs,
  GenderLabels,
  IValueWithRef,
  IInputsGenders,
  IHtmlElements,
  IInputElement,
  ISelectElement,
  IRadioElement,
  IFormState,
  IFields,
  IGiphyResponse,
  IErrorResponse,
};
