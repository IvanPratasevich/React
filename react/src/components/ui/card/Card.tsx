import { ICardProps } from 'models/interfaces';
import React from 'react';
import { capitalizeFirstLetter } from '../../../utils/utils';
import styles from './Card.module.css';
import { v4 as uuidv4 } from 'uuid';
import { setModal } from '../../../store/homeSlice';
import { useAppDispatch } from '../../../store/hooks';

const Card = (props: ICardProps) => {
  const { character, hiddenData, preview, modalMode } = props;

  const dispatch = useAppDispatch();

  return (
    <>
      <div
        className={`${styles.card}`}
        style={{ borderImageOutset: '15px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.card__container}>
          <div className={preview ? styles.hidden : styles.card__decoration}>
            <span className={styles.card__arrow}></span>
            <span className={styles.card__date}>
              {modalMode ? (
                <div
                  className="cross"
                  onClick={() =>
                    dispatch(
                      setModal({
                        showModal: false,
                        card: null,
                        loading: false,
                      })
                    )
                  }
                  style={{
                    cursor: 'pointer',
                  }}
                >
                  <svg
                    fill="#000000"
                    width="40px"
                    height="40px"
                    viewBox="0 0 24 24"
                    id="cross-circle"
                    data-name="Flat Line"
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon flat-line"
                  >
                    <circle
                      id="secondary"
                      cx="12"
                      cy="12"
                      r="9"
                      style={{
                        fill: 'rgb(44, 169, 188)',
                        strokeWidth: '2',
                      }}
                    ></circle>
                    <line
                      id="primary"
                      x1="15"
                      y1="15"
                      x2="9"
                      y2="9"
                      style={{
                        fill: 'none',
                        stroke: 'rgb(0, 0, 0)',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        strokeWidth: '2',
                      }}
                    ></line>
                    <line
                      id="primary-2"
                      data-name="primary"
                      x1="9"
                      y1="15"
                      x2="15"
                      y2="9"
                      style={{
                        fill: 'none',
                        stroke: 'rgb(0, 0, 0)',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        strokeWidth: '2',
                      }}
                    ></line>
                    <circle
                      id="primary-3"
                      data-name="primary"
                      cx="12"
                      cy="12"
                      r="9"
                      style={{
                        fill: 'none',
                        stroke: 'rgb(0, 0, 0)',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        strokeWidth: '2',
                      }}
                    ></circle>
                  </svg>
                </div>
              ) : (
                character.dateOfBirth
              )}
            </span>
          </div>
          <h2 className={styles.card__title} data-testid={`${character.name}`}>
            {character.name}
          </h2>
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
              modalMode
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
              data-testid={`submit-${character.id}`}
              type="submit"
              onClick={() =>
                dispatch(setModal({ showModal: true, card: character, loading: true }))
              }
            >
              submit
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Card;
