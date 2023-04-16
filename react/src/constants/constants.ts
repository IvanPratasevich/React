import { IHtmlElements, IPathes } from '../models/interfaces';

const Pathes: IPathes = {
  '/about-us': 'About us',
  '/404': '404',
  '/': 'Home',
  '/form': 'Form',
};

const initialState = {
  cards: [],
  showPopup: false,
  occupation: 'Choose occupation',
};

const htmlElements: IHtmlElements = {
  name: {
    name: 'name',
    type: 'text',
    validation: {
      required: 'The field is required!',
      minLength: {
        value: 2,
        message: 'Name must be at least 2 characters long!',
      },

      pattern: {
        value: /^[a-zA-Z\s]+$/,
        message: 'Please check your name!',
      },
    },
  },

  surname: {
    name: 'surname',
    type: 'text',
    validation: {
      minLength: {
        value: 3,
        message: 'Surname must be at least 3 characters long!',
      },

      pattern: {
        value: /^[a-zA-Z]+$/,
        message: 'Please check your surname!',
      },
    },
  },

  date: {
    name: 'date',
    type: 'date',
    validation: {
      required: 'The field is required!',
    },
  },

  img: {
    name: 'image',
    type: 'file',
    validation: {
      required: 'The field is required!',
      validate: (fileList: FileList): string | boolean => {
        if (fileList.length === 0) {
          return 'Please attach your image!';
        }

        const [image] = fileList;
        const { size, type } = image;

        return size < 10 * 1000000 && type.includes('image/')
          ? true
          : 'Please check your size or type of your image!';
      },
    },
  },

  select: {
    name: 'occupation',
    validation: {
      validate: (data: string) => (data === 'Choose occupation' ? 'The field is required!' : true),
    },
  },

  radio: {
    name: 'radio',
    type: 'radio',
    options: {
      male: 'male',
      female: 'female',
      'non-binary': 'non-binary',
    },
    validation: {
      required: 'The field is required!',
    },
  },

  checkbox: {
    name: 'checkbox',
    type: 'checkbox',
    agreement:
      'I agree that my personal data will be processed in the ways that correspond to the purposes of the processing of personal data',
    validation: {
      required: 'The field is required!',
    },
  },

  submit: {
    name: 'submit',
    type: 'submit',
  },
};

const apiUrl = 'https://cyberpunk2077-api.vercel.app';

const apiKey = 'fI25naItW6FnL3otm45EQkytQ6DTKhtf';

export { Pathes, initialState, htmlElements, apiUrl, apiKey };
