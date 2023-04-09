import { ICardProps, ICharacter } from 'models/interfaces';
import React, { useState } from 'react';
import { capitalizeFirstLetter } from '../../../utils/utils';
import styles from './Card.module.css';
import { v4 as uuidv4 } from 'uuid';
import { createPortal } from 'react-dom';
import Modal from '../modal/Modal';

const Card = (props: ICardProps) => {
  const { character, hiddenData, preview, modalClassname } = props;
  const [stateModal, setStateModal] = useState<{ showModal: boolean; card: ICharacter | null }>({
    showModal: false,
    card: null,
  });

  return (
    <>
      <div
        className={modalClassname ? `${styles.card} ${styles.modalCard}` : `${styles.card}`}
        style={{ borderImageOutset: '15px' }}
      >
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
          <ul
            className={
              modalClassname
                ? `${styles.modalInformation} ${styles.card__information}`
                : `${styles.card__information}`
            }
          >
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
            <button
              className={`${styles.submit}`}
              type="submit"
              onClick={() => setStateModal({ showModal: true, card: character })}
            >
              submit
            </button>
          )}
        </div>
      </div>
      {stateModal.showModal &&
        createPortal(
          <Modal stateModal={stateModal} setStateModal={setStateModal} />,
          document.body
        )}
    </>
  );
};

export default Card;
