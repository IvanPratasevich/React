import React from 'react';
import capitalizeFirstLetter from '../../utils/utils';
import styles from './Card.module.css';

const Card = (props) => {
  console.log(Object.entries(props));
  return (
    <div className={styles.card}>
      <div className={styles.card__decoration}>
        <span className={styles.card__arrow}></span>
        <span className={styles.card__date}> {props.dateOfBirth}</span>
      </div>
      <h2 className={styles.card__title}>{props.name}</h2>
      <div
        className={styles.card__img}
        style={{
          backgroundImage: `url(
            ${props.img}
          )`,
          width: '100%',
          height: '200px',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
        }}
      ></div>
      <div className={styles.card__information}>
        {Object.entries(props).map((prop, idx) =>
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
