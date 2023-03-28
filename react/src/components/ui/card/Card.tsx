import { ICardProps } from 'models/interfaces';
import React from 'react';
import { capitalizeFirstLetter, idGenerator } from '../../../utils/utils';
import styles from './Card.module.css';

const Card = (props: ICardProps) => {
  const { character, hiddenData } = props;

  return (
    <div className={styles.card} style={{ borderImageOutset: '15px' }}>
      <div className={styles.card__container}>
        <div className={styles.card__decoration}>
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
            width: '100%',
            height: '300px',
            borderRadius: '20px',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            alignSelf: 'center',
          }}
        ></div>
        <ul className={styles.card__information}>
          {Object.entries(character).map(([key, value]) =>
            !hiddenData.includes(key) ? (
              <li key={idGenerator()} className={styles.card__datapiece}>
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
      </div>
    </div>
  );
};

export default Card;
