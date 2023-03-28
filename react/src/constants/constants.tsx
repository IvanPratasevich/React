import React from 'react';
import { FormState, IHtmlElements, IPathes } from '../models/interfaces';

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

  inputSubmit: {
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

const htmlElements: IHtmlElements = {
  name: {
    ref: React.createRef(),
    name: 'name',
    type: 'text',
  },

  surname: {
    ref: React.createRef(),
    name: 'surname',
    type: 'text',
  },

  date: {
    ref: React.createRef(),
    name: 'date',
    type: 'date',
  },

  img: {
    ref: React.createRef(),
    name: 'image',
    type: 'file',
  },

  select: {
    ref: React.createRef(),
    name: 'occupation',
  },

  radio: {
    ref: React.createRef(),
    name: 'file',
    type: 'radio',
    options: {
      male: React.createRef(),
      female: React.createRef(),
      'non-binary': React.createRef(),
    },
  },

  checkbox: {
    ref: React.createRef(),
    name: 'checkbox',
    type: 'checkbox',
    agreement:
      'I agree that my personal data will be processed in the ways that correspond to the purposes of the processing of personal data',
  },

  submit: {
    ref: React.createRef(),
    name: 'submit',
    type: 'submit',
  },
};

export { Pathes, initialState, htmlElements };
