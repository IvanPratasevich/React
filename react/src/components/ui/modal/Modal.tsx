import React, { useEffect, useState } from 'react';
import { ICharacter } from '../../../models/interfaces';
import styles from './Modal.module.css';
import Card from '../card/Card';
import { v4 as uuidv4 } from 'uuid';
import { Api } from '../../../utils/utils';
import Error from '../error/Error';
import CardLoader from '../card-loader/CardLoader';

const Modal = (props: {
  stateModal: { showModal: boolean; card: ICharacter | null };
  setStateModal: React.Dispatch<
    React.SetStateAction<{
      showModal: boolean;
      card: ICharacter | null;
    }>
  >;
}) => {
  const { stateModal, setStateModal } = props;
  const [cardToShow, setCardToShow] = useState<ICharacter | null>(null);
  const [error, setError] = useState<{ errorMessage: string }>({ errorMessage: '' });
  const [loading, isLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      const api: Api = new Api();
      api
        .getCharacterById(String(stateModal.card!.id))
        .then((card) => {
          setError({ errorMessage: '' });
          setCardToShow(card as unknown as ICharacter);
          isLoading(false);
        })
        .catch((err: Error) => {
          setError({ errorMessage: err.message });
          setCardToShow(null);
        });
    }, 5000);
  }, []);

  return (
    <>
      {error.errorMessage ? (
        <div className={styles.modalContainer}>
          <div
            className={`${styles.modal}`}
            data-testid={`modal`}
            onClick={() =>
              setStateModal({
                showModal: false,
                card: null,
              })
            }
          ></div>
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: '10',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <Error errorMessage={error.errorMessage} />
          </div>
        </div>
      ) : loading ? (
        <div className={styles.modalContainer}>
          <div className={`${styles.modal}`} data-testid={`modal`}></div>
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: '10',
            }}
          >
            <CardLoader />;
          </div>
        </div>
      ) : (
        <div className={styles.modalContainer}>
          <div
            className={`${styles.modal}`}
            data-testid={`modal`}
            onClick={() =>
              setStateModal({
                showModal: false,
                card: null,
              })
            }
          ></div>
          <Card
            key={uuidv4()}
            preview={false}
            data-testid="modal-card"
            character={cardToShow!}
            hiddenData={['img']}
            modalClassname={true}
            setStateModal={setStateModal}
          />
        </div>
      )}
    </>
  );
};

export default Modal;
