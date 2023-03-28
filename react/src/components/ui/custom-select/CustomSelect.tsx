import { ISelectElement, IParentState } from '../../../models/interfaces';
import React from 'react';
import styles from './CustomSelect.module.css';
import { capitalizeFirstLetter, idGenerator } from '../../../utils/utils';

class CustomSelect extends React.Component<
  { parentState: IParentState; selectElement: ISelectElement; data: string[] },
  { parentState: IParentState; selectElement: ISelectElement; data: string[] }
> {
  constructor(props: { parentState: IParentState; selectElement: ISelectElement; data: string[] }) {
    super(props);
  }

  render() {
    const { parentState, selectElement, data } = this.props;
    console.log(selectElement);
    return (
      <div className={`${styles.form__field}`}>
        <label
          className={`${styles.form__label} ${parentState.name.error && styles.label__error}`}
          htmlFor={`${selectElement.name}`}
        >
          {capitalizeFirstLetter(`${selectElement.name}`)}
        </label>
        <select
          className={`${styles.form__select}`}
          name="occupation"
          defaultValue="Choose occupation"
          ref={selectElement.ref}
        >
          <option value={parentState.name.value} hidden>
            {parentState.name.value}
          </option>
          {data.map((el: string) => {
            return (
              <option key={idGenerator()} value={el}>
                {el}
              </option>
            );
          })}
        </select>
        <span className={`${styles.error}`}>{parentState.name.error}</span>
      </div>
    );
  }
}

export default CustomSelect;
