import { ISelectElement, IParentState } from '../../../models/interfaces';
import React from 'react';
import styles from './CustomSelect.module.css';
import { capitalizeFirstLetter } from '../../../utils/utils';
import { v4 as uuidv4 } from 'uuid';

class CustomSelect extends React.Component<
  { parentState: IParentState; selectElement: ISelectElement; data: string[] },
  { parentState: IParentState; selectElement: ISelectElement; data: string[] }
> {
  constructor(props: { parentState: IParentState; selectElement: ISelectElement; data: string[] }) {
    super(props);
  }

  render() {
    const { parentState, selectElement, data } = this.props;
    return (
      <div className={`${styles.form__field}`}>
        <label
          className={`${styles.form__label} ${parentState.error && styles.label__error}`}
          htmlFor={`${selectElement.name}`}
        >
          {capitalizeFirstLetter(`${selectElement.name}`)}
        </label>
        <select
          data-testid={`${selectElement.name}`}
          className={`${styles.form__select}`}
          name="occupation"
          defaultValue="Choose occupation"
          ref={selectElement.ref}
        >
          <option value={parentState.value} hidden>
            {parentState.value}
          </option>
          {data.map((el: string) => {
            return (
              <option key={uuidv4()} value={el}>
                {el}
              </option>
            );
          })}
        </select>
        <span className={`${styles.error}`}>{parentState.error}</span>
      </div>
    );
  }
}

export default CustomSelect;
