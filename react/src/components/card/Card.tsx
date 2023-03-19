import ICharacter from 'interfaces/interfaces';
import React from 'react';
import capitalizeFirstLetter from '../../utils/utils';
import styles from './Card.module.css';

const Card = (props: { character: ICharacter; key: string }) => {
  const { character } = props;
  return (
    <div className={styles.card}>
      <div className={styles.card__decoration}>
        <span className={styles.card__arrow}></span>
        <span className={styles.card__date}> {character.dateOfBirth}</span>
      </div>
      <h2 className={styles.card__title}>{character.name}</h2>
      <div
        className={styles.card__img}
        style={{
          backgroundImage: `url(
            ${character.img}
          )`,
          width: '100%',
          height: '200px',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
        }}
      ></div>
      <div className={styles.card__information}>
        {Object.entries(character).map((prop, idx) =>
          prop[0] !== 'img' && prop[0] !== 'name' && prop[0] !== 'dateOfBirth' ? (
            <div key={idx} className={styles.card__datapiece}>
              {capitalizeFirstLetter(prop.join(': '))}
            </div>
          ) : (
            ''
          )
        )}
      </div>
    </div>
  );
};

export default Card;
