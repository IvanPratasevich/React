import { occupations } from '../../../database/database';
import React from 'react';
import styles from './Form.module.css';
import { capitalizeFirstLetter, Validation } from '../../../utils/utils';
import { FormState, ICharacter, IHtmlElements } from '../../../models/interfaces';
import CardsList from '../cards-list/CardsList';
import Popup from '../popup/Popup';
import { htmlElements, initialState } from '../../../constants/constants';
import CustomInput from '../custom-input/CustomInput';
import CustomSelect from '../custom-select/CustomSelect';
import CustomRadio from '../custom-radio/CustomRadio';

class Form extends React.Component<Record<string, never>, FormState> {
  private form: React.RefObject<HTMLFormElement>;
  private validator: Validation;
  private tempState: FormState;
  private htmlElements: IHtmlElements;

  constructor(props: Record<string, never>) {
    super(props);

    this.tempState = initialState;

    this.state = this.tempState;

    this.form = React.createRef();

    this.htmlElements = htmlElements;

    this.validator = new Validation();
  }

  handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>): void => {
    event?.preventDefault();

    this.tempState = Object.assign(
      {},
      ...[
        this.validator.validateName(this.htmlElements.name.ref.current!.value),
        this.validator.validateSurname(this.htmlElements.surname.ref.current!.value),
        this.validator.validateDate(this.htmlElements.date.ref.current!.value),
        this.validator.validateImage(this.htmlElements.img.ref.current!.files!),
        this.validator.validateOccupation(this.htmlElements.select.ref.current!.value),
        this.validator.validateGender([
          this.htmlElements.radio.options.male.current!,
          this.htmlElements.radio.options.female.current!,
          this.htmlElements.radio.options['non-binary'].current!,
        ]),
        this.validator.validateCheckbox(this.htmlElements.checkbox.ref.current!),
      ]
    );

    const card: ICharacter | null = this.generateCard() || null;

    this.updateState(card);
  };

  updateState(card: ICharacter | null) {
    const updatesForState = Object.assign({}, card ? initialState : this.tempState, {
      cardsList: {
        error: null,
        cards: [...this.state.cardsList.cards, card].filter(Boolean),
      },
      popup: {
        error: null,
        state: card ? true : false,
      },
    });

    this.setState(updatesForState, () => (card ? this.eventsAfterSubmit() : () => {}));
  }

  eventsAfterSubmit = (): void => {
    this.showPopup();
    this.form.current?.reset();
    this.resetCheckboxes();
  };

  showPopup = (): void => {
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

  resetCheckboxes = (): void => {
    this.htmlElements.radio.options.male.current!.checked = false;
    this.htmlElements.radio.options.female.current!.checked = false;
    this.htmlElements.radio.options['non-binary'].current!.checked = false;
  };

  generateCard = (): ICharacter | undefined => {
    const card: ICharacter = {
      name: this.htmlElements.name.ref.current!.value,
      surname: this.htmlElements.surname.ref.current!.value,
      img: this.htmlElements.img.ref.current!.files![0]
        ? URL.createObjectURL(this.htmlElements.img.ref.current!.files![0])
        : '',
      gender: capitalizeFirstLetter(this.tempState.inputGender.value),
      occupation: this.htmlElements.select.ref.current!.value,
      dateOfBirth: this.htmlElements.date.ref.current!.value,
      age: Math.floor(
        (+new Date() - +new Date(this.htmlElements.date.ref.current!.value)) /
          (1000 * 60 * 60 * 24 * 365)
      ),
    };

    const mandatoryFields: string[] = [
      'inputName',
      'inputDate',
      'inputImage',
      'selectOccupation',
      'inputGender',
      'inputCheckbox',
    ];

    const checkedFields: boolean[] = [];

    for (const field in mandatoryFields) {
      if (this.tempState[mandatoryFields[field] as keyof FormState].error === null) {
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
      inputSubmit,
    } = this.state;

    return (
      <>
        <form ref={this.form} onSubmit={this.handleSubmit} className={`${styles.form}`} noValidate>
          <div className={`${styles.form__container}`}>
            <h1 className={`${styles.form__title}`}>Form</h1>
            <CustomInput parentState={inputName} inputElement={this.htmlElements.name} />
            <CustomInput parentState={inputSurname} inputElement={this.htmlElements.surname} />
            <CustomInput parentState={inputDate} inputElement={this.htmlElements.date} />
            <CustomInput parentState={inputImage} inputElement={this.htmlElements.img} />
            <CustomSelect
              parentState={selectOccupation}
              selectElement={this.htmlElements.select}
              data={occupations}
            />
            <CustomRadio parentState={inputGender} radioElement={this.htmlElements.radio} />
            <CustomInput parentState={inputCheckbox} inputElement={this.htmlElements.checkbox} />
            <CustomInput parentState={inputSubmit} inputElement={this.htmlElements.submit} />
            <Popup hidden={this.state.popup.state} />
          </div>
        </form>
        <CardsList page="Form" cardsList={this.state.cardsList.cards} hiddenDataArr={['img']} />
      </>
    );
  };
}

export { Form };
