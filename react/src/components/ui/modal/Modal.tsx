import React, { useEffect, useState } from 'react';
import { ICharacter } from '../../../models/interfaces';
import styles from './Modal.module.css';
import Card from '../card/Card';
import { v4 as uuidv4 } from 'uuid';
import Error from '../error/Error';
import CardLoader from '../card-loader/CardLoader';
import { setModal } from '../../../store/homeSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useGetCharacterByIdQuery } from '../../../store/cyberpunkApi';

const Modal = () => {
  const dispatch = useAppDispatch();

  const [error, setError] = useState<{ errorMessage: string }>({ errorMessage: '' });

  const modal = useAppSelector((state) => state.home.modal);

  const {
    data: card,
    error: queryError,
    isSuccess,
  } = useGetCharacterByIdQuery(String(modal.card!.id));

  useEffect(() => {
    if (queryError) {
      if ('status' in queryError) {
        setError({ errorMessage: JSON.stringify(queryError.data) });
      } else {
        setError({ errorMessage: 'Error!' });
      }
    }

    if (isSuccess) {
      setError({ errorMessage: '' });
      dispatch(setModal({ showModal: true, card: card as unknown as ICharacter, loading: false }));
    }
  }, [card, isSuccess, queryError]);

  return (
    <>
      {error.errorMessage ? (
        <div
          className={`${styles.modal}`}
          data-testid={`modal`}
          onClick={() =>
            dispatch(
              setModal({
                showModal: false,
                card: null,
                loading: false,
              })
            )
          }
        >
          <Error errorMessage={error.errorMessage} />
        </div>
      ) : modal.loading ? (
        <div className={`${styles.modal}`} data-testid={`modal`}>
          <CardLoader />;
        </div>
      ) : (
        <div
          className={`${styles.modal}`}
          data-testid={`modal`}
          onClick={() =>
            dispatch(
              setModal({
                showModal: false,
                card: null,
                loading: false,
              })
            )
          }
        >
          <Card
            key={uuidv4()}
            preview={false}
            data-testid="modal-card"
            character={modal.card!}
            hiddenData={['img']}
            modalMode={true}
          />
        </div>
      )}
    </>
  );
};

export default Modal;
