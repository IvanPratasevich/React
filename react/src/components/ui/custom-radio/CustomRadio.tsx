import { IRadioElement } from '../../../models/interfaces';
import React from 'react';
import styles from './CustomRadio.module.css';
import { v4 as uuidv4 } from 'uuid';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

const CustomRadio = (props: {
  radioElement: IRadioElement;
  data: string[];
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}) => {
  const { radioElement, register, errors } = props;

  return (
    <div className={`${styles.form__field} ${styles.form__fieldRadio}`}>
      <label
        className={`${styles.form__label} ${errors[radioElement.name] && styles.label__error}`}
        htmlFor="name"
      >
        Choose gender:
      </label>
      {Object.entries(radioElement.options).map(([option]) => (
        <div className={`${styles.form__row}`} key={uuidv4()}>
          <input
            {...register(`${radioElement.name}`, radioElement.validation)}
            data-testid={option}
            className={`${styles.form__inputRadio}`}
            type="radio"
            defaultChecked={false}
            value={option}
          />
          <label className={`${styles.form__labelRadio}`} htmlFor="gender">
            {option}
          </label>
        </div>
      ))}
      <span className={`${styles.error}`}>
        {' '}
        {errors[radioElement.name as string] &&
          (errors[radioElement.name as string]?.message as string)}
      </span>
    </div>
  );
};

export default CustomRadio;
