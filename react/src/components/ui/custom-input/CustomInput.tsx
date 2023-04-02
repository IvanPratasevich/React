import { IInputElement } from '../../../models/interfaces';
import React from 'react';
import styles from './CustomInput.module.css';
import { capitalizeFirstLetter } from '../../../utils/utils';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

const CustomInput = (props: {
  register: UseFormRegister<FieldValues>;
  inputElement: IInputElement;
  errors: FieldErrors<FieldValues>;
}) => {
  const { register, inputElement, errors } = props;

  return inputElement.name !== 'submit' ? (
    <div className={inputElement.agreement ? `${styles.form__agreement}` : `${styles.form__field}`}>
      <label
        className={
          inputElement.agreement
            ? `${styles.form__label}`
            : `${styles.form__label} ${errors[inputElement.name] && styles.label__error}`
        }
        htmlFor={`${inputElement.name}`}
      >
        {inputElement.agreement
          ? inputElement.agreement
          : capitalizeFirstLetter(`${inputElement.name}`)}
      </label>
      <input
        {...register(`${inputElement.name}`, inputElement.validation)}
        data-testid={`${inputElement.name}`}
        autoComplete="off"
        className={
          inputElement.agreement
            ? `${styles.form__input} ${styles.form__inputCheckbox}`
            : `${styles.form__input}`
        }
        type={`${inputElement.type}`}
        defaultValue=""
      />
      <span data-testid={`error-${inputElement.name}`} className={`${styles.error}`}>
        {errors[inputElement.name as string] &&
          (errors[inputElement.name as string]?.message as string)}
      </span>
    </div>
  ) : (
    <input
      data-testid={`${inputElement.name}`}
      className={`${styles.form__submitBtn}`}
      type={`${inputElement.type}`}
      value={`${inputElement.type}`}
    />
  );
};

export default CustomInput;
