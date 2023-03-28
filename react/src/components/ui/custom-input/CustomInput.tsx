import { IInputElement, IParentState } from '../../../models/interfaces';
import React from 'react';
import styles from './CustomInput.module.css';
import { capitalizeFirstLetter } from '../../../utils/utils';

class CustomInput extends React.Component<
  { parentState: IParentState; inputElement: IInputElement },
  { parentState: IParentState; inputElement: IInputElement }
> {
  constructor(props: { parentState: IParentState; inputElement: IInputElement }) {
    super(props);
  }

  render() {
    const { parentState, inputElement } = this.props;
    return inputElement.name !== 'submit' ? (
      <div
        className={inputElement.agreement ? `${styles.form__agreement}` : `${styles.form__field}`}
      >
        <label
          className={
            inputElement.agreement
              ? `${styles.form__label}`
              : `${styles.form__label} ${parentState.error && styles.label__error}`
          }
          htmlFor={`${inputElement.name}`}
        >
          {inputElement.agreement
            ? inputElement.agreement
            : capitalizeFirstLetter(`${inputElement.name}`)}
        </label>
        <input
          data-testid={`${inputElement.name}`}
          autoComplete="off"
          className={
            inputElement.agreement
              ? `${styles.form__input} ${styles.form__inputCheckbox}`
              : `${styles.form__input}`
          }
          type={`${inputElement.type}`}
          name={`${inputElement.name}`}
          defaultValue=""
          ref={inputElement.ref}
        />
        <span data-testid={`error-${inputElement.name}`} className={`${styles.error}`}>
          {parentState.error}
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
  }
}

export default CustomInput;
