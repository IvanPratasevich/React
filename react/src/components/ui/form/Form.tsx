import { occupations } from '../../../database/database';
import React from 'react';
import styles from './Form.module.css';
import { capitalizeFirstLetter, idGenerator } from '../../../utils/utils';
import {
  GenderLabels,
  GenderInputs,
  FormState,
  IValueWithRef,
  ICharacter,
} from '../../../models/interfaces';
import CardsList from '../cards-list/CardsList';
import Popup from '../popup/Popup';

class Form extends React.Component<Record<string, never>, FormState> {
  private inputName: React.RefObject<HTMLInputElement>;
  private inputSurname: React.RefObject<HTMLInputElement>;
  private inputDate: React.RefObject<HTMLInputElement>;
  private inputImage: React.RefObject<HTMLInputElement>;
  private selectOccupation: React.RefObject<HTMLSelectElement>;
  private inputGenderFirst: React.RefObject<HTMLInputElement>;
  private inputGenderSecond: React.RefObject<HTMLInputElement>;
  private inputGenderThird: React.RefObject<HTMLInputElement>;
  private inputCheckbox: React.RefObject<HTMLInputElement>;
  private form: React.RefObject<HTMLFormElement>;
  private options: GenderLabels;
  private valueWithRef: IValueWithRef;
  private checkboxStates;

  constructor(props: Record<string, never>) {
    super(props);

    this.state = {
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
        error: null,
      },

      inputCheckbox: {
        values: {
          inputGenderFirst: false,
          inputGenderSecond: false,
          inputGenderThird: false,
        },
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

    this.inputName = React.createRef();

    this.inputSurname = React.createRef();

    this.inputDate = React.createRef();

    this.inputImage = React.createRef();

    this.selectOccupation = React.createRef();

    this.inputGenderFirst = React.createRef();

    this.inputGenderSecond = React.createRef();

    this.inputGenderThird = React.createRef();

    this.inputCheckbox = React.createRef();

    this.form = React.createRef();

    this.options = {
      male: this.inputGenderFirst,
      female: this.inputGenderSecond,
      'non-binary': this.inputGenderThird,
    };

    this.valueWithRef = {
      male: 'inputGenderFirst',
      female: 'inputGenderSecond',
      'non-binary': 'inputGenderThird',
    };

    this.checkboxStates = {
      inputGenderFirst: false,
      inputGenderSecond: false,
      inputGenderThird: false,
    };
  }

  handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>): Promise<void> => {
    event?.preventDefault();
    const tempState = [
      this.validateName(this.inputName.current!.value),
      this.validateSurname(this.inputSurname.current!.value),
      this.validateDate(this.inputDate.current!.value),
      this.validateImage(this.inputImage.current!.files!),
      this.validateOccupation(this.selectOccupation.current!.value),
      this.validateGender([
        this.inputGenderFirst.current!,
        this.inputGenderSecond.current!,
        this.inputGenderThird.current!,
      ]),
      this.validateCheckbox(this.inputCheckbox.current!),
    ];

    this.setState(
      (prevState) => Object.assign(prevState, ...tempState),
      () => {
        const card: ICharacter | null = this.generateCards() || null;

        if (card) {
          this.setState(
            (prevState) => {
              return {
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
                  error: null,
                },
                inputCheckbox: {
                  values: {
                    inputGenderFirst: false,
                    inputGenderSecond: false,
                    inputGenderThird: false,
                  },
                  error: null,
                },
                cardsList: {
                  error: null,
                  cards: [...prevState.cardsList.cards, card],
                },
                popup: {
                  error: null,
                  state: true,
                },
              };
            },
            () => {
              this.showPopup();
              this.form.current?.reset();
              this.resetCheckboxes();
              this.checkboxStates = {
                inputGenderFirst: false,
                inputGenderSecond: false,
                inputGenderThird: false,
              };
            }
          );
        }
      }
    );
  };

  showPopup = () => {
    setTimeout(() => {
      this.setState((prevState) => {
        return {
          ...prevState,
          popup: {
            error: null,
            state: false,
          },
        };
      });
    }, 3000);
  };

  validateName = (name: string) => {
    const nameWithNoSpaces = name.replaceAll(' ', '');
    const isNameValid = /^[a-zA-Z]+$/.test(nameWithNoSpaces);
    return isNameValid &&
      name.length > 3 &&
      nameWithNoSpaces[0] === nameWithNoSpaces[0].toUpperCase()
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

  validateImage = (fileList: FileList) => {
    if (fileList.length === 0) {
      return { inputImage: { error: 'Please attach your image!' } };
    }

    const [image] = fileList;
    const { size, type } = image;

    return size < 10 * 1000000 && type.includes('image/')
      ? { inputImage: { value: URL.createObjectURL(image), error: null } }
      : { inputImage: { error: 'Please check your image!' } };
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

  validateOccupation = (value: string) => {
    return value === 'Choose occupation'
      ? { selectOccupation: { value: 'Choose occupation', error: 'Please enter occupation!' } }
      : { selectOccupation: { value: value, error: null } };
  };

  resetCheckboxes = (): void => {
    this.inputGenderFirst.current!.checked = false;
    this.inputGenderSecond.current!.checked = false;
    this.inputGenderThird.current!.checked = false;
  };

  validateGender = (genders: HTMLInputElement[]) => {
    const checkedGender = genders.filter((gender) => gender.checked)[0];

    if (!checkedGender) {
      return {
        inputGender: {
          value: '',
          error: 'Please choose gender!',
        },
      };
    }

    this.checkboxStates.inputGenderFirst = false;
    this.checkboxStates.inputGenderSecond = false;
    this.checkboxStates.inputGenderThird = false;

    this.checkboxStates[
      `${this.valueWithRef[checkedGender.value as keyof GenderLabels]}` as keyof GenderInputs
    ] = true;

    return checkedGender
      ? {
          inputGender: {
            value: checkedGender.value,
            error: null,
          },
        }
      : {
          inputGender: {
            error: 'Please choose gender!',
          },
        };
  };

  validateCheckbox = (checkbox: HTMLInputElement) => {
    return checkbox.checked
      ? { inputCheckbox: { value: checkbox.value, error: null } }
      : { inputCheckbox: { value: '', error: 'Please accept the agreement!' } };
  };

  generateCards = () => {
    const card = {
      name: this.inputName.current!.value,
      surname: this.inputSurname.current!.value,
      img: this.inputImage.current!.files![0]
        ? URL.createObjectURL(this.inputImage.current!.files![0])
        : '',
      gender: capitalizeFirstLetter(this.state.inputGender.value),
      occupation: this.selectOccupation.current!.value,
      dateOfBirth: this.inputDate.current!.value,
      age: Math.floor(
        (+new Date() - +new Date(this.inputDate.current!.value)) / (1000 * 60 * 60 * 24 * 365)
      ),
    };

    const mandatoryFields = [
      'inputName',
      'inputDate',
      'inputImage',
      'selectOccupation',
      'inputGender',
      'inputCheckbox',
    ];

    const checkedFields: boolean[] = [];

    for (const field in mandatoryFields) {
      if (this.state[mandatoryFields[field] as keyof FormState].error === null) {
        checkedFields.push(true);
      } else {
        checkedFields.push(false);
      }
    }

    if (checkedFields.filter((field: boolean) => field).length === mandatoryFields.length) {
      return card;
    }
  };

  render = () => {
    const {
      inputName,
      inputSurname,
      inputDate,
      inputImage,
      selectOccupation,
      inputGender,
      inputCheckbox,
    } = this.state;
    return (
      <>
        <form ref={this.form} onSubmit={this.handleSubmit} className={`${styles.form}`} noValidate>
          <div className={`${styles.form__container}`}>
            <h1 className={`${styles.form__title}`}>Form</h1>
            <div className={`${styles.form__field}`}>
              <label
                className={`${styles.form__label} ${inputName.error && styles.label__error}`}
                htmlFor="name"
              >
                Name
              </label>
              <input
                autoComplete="off"
                className={`${styles.form__input}`}
                type="text"
                name="name"
                defaultValue=""
                ref={this.inputName}
              />
              <span className={`${styles.error}`}>{inputName.error}</span>
            </div>

            <div className={`${styles.form__field}`}>
              <label
                className={`${styles.form__label} ${inputSurname.error && styles.label__error}`}
                htmlFor="name"
              >
                Surname
              </label>
              <input
                autoComplete="off"
                className={`${styles.form__input}`}
                type="text"
                name="surname"
                defaultValue=""
                ref={this.inputSurname}
              />
              <span className={`${styles.error}`}>{inputSurname.error}</span>
            </div>

            <div className={`${styles.form__field}`}>
              <label
                className={`${styles.form__label} ${inputDate.error && styles.label__error}`}
                htmlFor="name"
              >
                Birth date
              </label>
              <input
                className={`${styles.form__input}`}
                type="date"
                defaultValue=""
                name="birth-date"
                lang="en"
                ref={this.inputDate}
              />
              <span className={`${styles.error}`}>{inputDate.error}</span>
            </div>

            <div className={`${styles.form__field}`}>
              <label
                className={`${styles.form__label} ${inputImage.error && styles.label__error}`}
                htmlFor="name"
              >
                Image
              </label>
              <input
                accept="image/*"
                defaultValue=""
                className={`${styles.form__input}`}
                type="file"
                name="image"
                lang="en"
                ref={this.inputImage}
              />
              <span className={`${styles.error}`}>{inputImage.error}</span>
            </div>

            <div className={`${styles.form__field}`}>
              <label
                className={`${styles.form__label} ${selectOccupation.error && styles.label__error}`}
                htmlFor="occupation"
              >
                Occupation
              </label>
              <select
                className={`${styles.form__select}`}
                name="occupation"
                defaultValue="Choose occupation"
                ref={this.selectOccupation}
              >
                <option value={selectOccupation.value} hidden>
                  {selectOccupation.value}
                </option>
                {occupations.map((occupation: string) => {
                  return (
                    <option key={idGenerator()} value={occupation}>
                      {occupation}
                    </option>
                  );
                })}
              </select>
              <span className={`${styles.error}`}>{selectOccupation.error}</span>
            </div>

            <div className={`${styles.form__field} ${styles.form__fieldRadio}`}>
              <label
                className={`${styles.form__label} ${inputGender.error && styles.label__error}`}
                htmlFor="name"
              >
                Choose gender:
              </label>
              {Object.entries(this.options).map(([option, attribute], idx) => (
                <div className={`${styles.form__row}`} key={idGenerator()}>
                  <input
                    className={`${styles.form__inputRadio}`}
                    type="radio"
                    name="gender"
                    defaultChecked={Object.values(this.checkboxStates)[idx]}
                    ref={attribute}
                    value={option}
                  />
                  <label className={`${styles.form__labelRadio}`} htmlFor="gender">
                    {option}
                  </label>
                </div>
              ))}
              <span className={`${styles.error}`}>{inputGender.error}</span>
            </div>

            <div className={`${styles.form__agreement}`}>
              <div className={`${styles.form__block}`}>
                <input
                  className={`${styles.form__label} ${inputCheckbox.error && styles.label__error}`}
                  type="checkbox"
                  name="agreement"
                  ref={this.inputCheckbox}
                />
                <label className={`${styles.form__labelCheckbox}`} htmlFor="gender">
                  I agree that my personal data will be processed in the ways that correspond to the
                  purposes of the processing of personal data
                </label>
              </div>
              <div className={`${styles.form__block}`}>
                <span className={`${styles.error}`}>{inputCheckbox.error}</span>
              </div>
            </div>
            <input className={`${styles.form__submitBtn}`} type="submit" value="Submit" />
            <Popup hidden={this.state.popup.state} />
          </div>
        </form>

        <CardsList page="Form" cardsList={this.state.cardsList.cards} hiddenDataArr={['img']} />
      </>
    );
  };
}

export { Form };
