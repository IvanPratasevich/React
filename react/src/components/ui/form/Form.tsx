import { occupations } from '../../../database/database';
import React, { useState } from 'react';
import styles from './Form.module.css';
import { capitalizeFirstLetter } from '../../../utils/utils';
import { ICharacter, IFormState } from '../../../models/interfaces';
import CardsList from '../cards-list/CardsList';
import Popup from '../popup/Popup';
import { htmlElements, initialState } from '../../../constants/constants';
import CustomInput from '../custom-input/CustomInput';
import CustomSelect from '../custom-select/CustomSelect';
import CustomRadio from '../custom-radio/CustomRadio';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

const Form = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const [state, setState] = useState<IFormState>(initialState);

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    const card = generateCard(data);

    const updateState = { ...state, showPopup: true, cards: [...state.cards, card] };

    setState(updateState);

    eventsAfterSubmit();
  };

  const eventsAfterSubmit = (): void => {
    showPopup();
    reset();
  };

  const showPopup = () => {
    setTimeout(() => {
      setState((prevState) => {
        return {
          ...prevState,
          showPopup: false,
        };
      });
    }, 3000);
  };

  const generateCard = (data: FieldValues): ICharacter => {
    const { name, surname, occupation, image, radio, date } = data;
    const card: ICharacter = {
      name,
      surname,
      img: URL.createObjectURL(image[0]),
      gender: capitalizeFirstLetter(radio),
      occupation,
      dateOfBirth: date,
      age: Math.floor((+new Date() - +new Date(date)) / (1000 * 60 * 60 * 24 * 365)),
    };

    return card;
  };

  return (
    <>
      <form
        data-testid="form"
        onSubmit={handleSubmit(onSubmit)}
        className={`${styles.form}`}
        noValidate
      >
        <div className={`${styles.form__container}`}>
          <h1 className={`${styles.form__title}`}>Form</h1>
          <CustomInput errors={errors} inputElement={htmlElements.name} register={register} />
          <CustomInput errors={errors} inputElement={htmlElements.surname} register={register} />
          <CustomInput errors={errors} inputElement={htmlElements.date} register={register} />
          <CustomInput errors={errors} inputElement={htmlElements.img} register={register} />
          <CustomSelect
            errors={errors}
            selectElement={htmlElements.select}
            data={occupations}
            register={register}
          />
          <CustomRadio
            errors={errors}
            data={occupations}
            register={register}
            radioElement={htmlElements.radio}
          />
          <CustomInput errors={errors} inputElement={htmlElements.checkbox} register={register} />
          <Popup hidden={state.showPopup} />
          <CustomInput errors={errors} inputElement={htmlElements.submit} register={register} />
        </div>
      </form>

      <CardsList page="Form" cardsList={state.cards} hiddenDataArr={['img']} />
    </>
  );
};

export { Form };
