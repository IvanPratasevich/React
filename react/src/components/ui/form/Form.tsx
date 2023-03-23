import { occupations } from '../../../database/database';
import React from 'react';
import styles from './Form.module.css';
import { idGenerator } from '../../../utils/utils';

class Form extends React.Component {
  render = () => {
    return (
      <>
        <form className={`${styles.form}`}>
          <div className={`${styles.form__container}`}>
            <h1 className={`${styles.form__title}`}>Form</h1>
            <div className={`${styles.form__field}`}>
              <label className={`${styles.form__label}`} htmlFor="name">
                Name
              </label>
              <input
                autoComplete="off"
                className={`${styles.form__input}`}
                type="text"
                name="name"
                required
              />
            </div>

            <div className={`${styles.form__field}`}>
              <label className={`${styles.form__label}`} htmlFor="name">
                Description
              </label>
              <input
                autoComplete="off"
                className={`${styles.form__input}`}
                type="text"
                name="description"
                required
              />
            </div>

            <div className={`${styles.form__field}`}>
              <label className={`${styles.form__label}`} htmlFor="name">
                Birth date
              </label>
              <input className={`${styles.form__input}`} type="text" name="birth-date" required />
            </div>

            <div className={`${styles.form__field}`}>
              <label className={`${styles.form__label}`} htmlFor="name">
                Image
              </label>
              <input className={`${styles.form__input}`} type="file" name="image" required />
            </div>

            <div className={`${styles.form__field}`}>
              <label className={`${styles.form__label}`} htmlFor="occupation">
                Occupation
              </label>
              <select className={`${styles.form__select}`} name="occupation" required>
                <option value="">Choose occupation</option>
                {occupations.map((occupation: string) => {
                  return (
                    <option key={idGenerator()} value={occupation}>
                      {occupation}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className={`${styles.form__field} ${styles.form__fieldRadio}`}>
              <label className={`${styles.form__label}`} htmlFor="name">
                Choose gender:
              </label>

              <div className={`${styles.form__row}`}>
                <input
                  className={`${styles.form__inputRadio}`}
                  type="radio"
                  name="gender"
                  required
                />
                <label className={`${styles.form__labelRadio}`} htmlFor="gender">
                  Male
                </label>
              </div>
              <div className={`${styles.form__row}`}>
                <input
                  className={`${styles.form__inputRadio}`}
                  type="radio"
                  name="gender"
                  required
                />
                <label className={`${styles.form__labelRadio}`} htmlFor="gender">
                  Female
                </label>
              </div>

              <div className={`${styles.form__row}`}>
                <input
                  className={`${styles.form__inputRadio}`}
                  type="radio"
                  name="gender"
                  required
                />
                <label className={`${styles.form__labelRadio}`} htmlFor="gender">
                  Non-binary
                </label>
              </div>
            </div>

            <div className={`${styles.form__agreement}`}>
              <input
                className={`${styles.form__inputCheckbox}`}
                type="checkbox"
                name="agreement"
                required
              />
              <label className={`${styles.form__labelCheckbox}`} htmlFor="gender">
                I agree that my personal data will be processed in the ways that correspond to the
                purposes of the processing of personal data
              </label>
            </div>
          </div>
        </form>
      </>
    );
  };
}

export { Form };
