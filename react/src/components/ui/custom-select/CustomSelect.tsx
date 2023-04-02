import { ISelectElement } from '../../../models/interfaces';
import React from 'react';
import styles from './CustomSelect.module.css';
import { capitalizeFirstLetter } from '../../../utils/utils';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

const CustomSelect = (props: {
  selectElement: ISelectElement;
  data: string[];
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}) => {
  const { selectElement, errors, register } = props;

  return (
    <div className={`${styles.form__field}`}>
      <label
        className={`${styles.form__label} ${errors[selectElement.name] && styles.label__error}`}
        htmlFor={`${selectElement.name}`}
      >
        {capitalizeFirstLetter(`${selectElement.name}`)}
      </label>
      <select
        {...register(`${selectElement.name}`, selectElement.validation)}
        data-testid={`${selectElement.name}`}
        className={`${styles.form__select}`}
      >
        <option value={'Choose occupation'} hidden>
          Choose occupation
        </option>
        <option value="Nomad">Nomad</option>
        <option value="Mercenary">Mercenary</option>
        <option value="Ripperdoc">Ripperdoc</option>
        <option value="Corporate Agent">Corporate Agent</option>
        <option value="Braindance Technician">Braindance Technician</option>
        <option value="Rockstar">Rockstar</option>
        <option value="Fortune Teller">Fortune Teller</option>
        <option value="AI Chauffeur">AI Chauffeur</option>
      </select>
      <span className={`${styles.error}`}>
        {' '}
        {errors[selectElement.name as string] &&
          (errors[selectElement.name as string]?.message as string)}
      </span>
    </div>
  );
};

export default CustomSelect;
