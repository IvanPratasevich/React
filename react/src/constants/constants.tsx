import { FormState, IPathes } from '../models/interfaces';

const Pathes: IPathes = {
  '/about-us': 'About us',
  '/404': '404',
  '/': 'Home',
  '/form': 'Form',
};

const initialState: FormState = {
  inputName: {
    error: null,
  },

  inputSurname: {
    error: null,
  },

  inputDate: {
    value: '',
    error: null,
  },

  inputImage: {
    value: '',
    error: null,
  },

  selectOccupation: {
    value: 'Choose occupation',
    error: null,
  },

  inputGender: {
    value: '',
    values: {
      inputGenderFirst: false,
      inputGenderSecond: false,
      inputGenderThird: false,
    },
    error: null,
  },

  inputCheckbox: {
    error: null,
  },

  cardsList: {
    error: null,
    cards: [],
  },

  popup: {
    error: null,
    state: false,
  },
};

export { Pathes, initialState };
