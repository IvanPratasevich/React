import { IRadioElement, IParentState } from '../../../models/interfaces';
import React from 'react';
import styles from './CustomRadio.module.css';
import { idGenerator } from '../../../utils/utils';

class CustomRadio extends React.Component<
  { parentState: IParentState; radioElement: IRadioElement },
  { parentState: IParentState; radioElement: IRadioElement }
> {
  constructor(props: { parentState: IParentState; radioElement: IRadioElement }) {
    super(props);
  }

  render() {
    const { parentState, radioElement } = this.props;
    return (
      <div className={`${styles.form__field} ${styles.form__fieldRadio}`}>
        <label
          className={`${styles.form__label} ${parentState.name.error && styles.label__error}`}
          htmlFor="name"
        >
          Choose gender:
        </label>
        {Object.entries(radioElement.options).map(([option, attribute], idx) => (
          <div className={`${styles.form__row}`} key={idGenerator()}>
            <input
              className={`${styles.form__inputRadio}`}
              type="radio"
              name="gender"
              defaultChecked={Object.values(parentState.name.values!)[idx]}
              ref={attribute}
              value={option}
            />
            <label className={`${styles.form__labelRadio}`} htmlFor="gender">
              {option}
            </label>
          </div>
        ))}
        <span className={`${styles.error}`}>{parentState.name.error}</span>
      </div>
    );
  }
}

export default CustomRadio;
