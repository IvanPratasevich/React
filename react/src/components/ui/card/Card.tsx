import { ICardProps } from 'models/interfaces';
import React from 'react';
import { capitalizeFirstLetter } from '../../../utils/utils';
import styles from './Card.module.css';
import { v4 as uuidv4 } from 'uuid';

const Card = (props: ICardProps) => {
  const { character, hiddenData, preview } = props;

  const handleModal = () => {
    console.log(character);
  };

  return (
    <div className={styles.card} style={{ borderImageOutset: '15px' }}>
      <div className={styles.card__container}>
        <div className={preview ? styles.hidden : styles.card__decoration}>
          <span className={styles.card__arrow}></span>
          <span className={styles.card__date}> {character.dateOfBirth}</span>
        </div>
        <h2 className={styles.card__title}>{character.name}</h2>
        <div
          className={`${styles.card__img}`}
          style={{
            backgroundImage: `url(
            ${character.img}
          )`,
          }}
        ></div>
        <ul className={styles.card__information}>
          {Object.entries(character).map(([key, value]) =>
            !hiddenData.includes(key) ? (
              <li key={uuidv4()} className={styles.card__datapiece}>
                <span
                  className={`${styles.card__datapiece}`}
                  style={{ color: 'white', display: 'inline-block' }}
                >
                  {capitalizeFirstLetter(key)}:
                </span>{' '}
                {value}
              </li>
            ) : (
              ''
            )
          )}
        </ul>
        {preview && (
          <button className={`${styles.submit}`} type="submit" onClick={handleModal}>
            submit
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
