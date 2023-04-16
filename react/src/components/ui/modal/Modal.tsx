import React, { useEffect, useState } from 'react';
import { ICharacter } from '../../../models/interfaces';
import styles from './Modal.module.css';
import Card from '../card/Card';
import { v4 as uuidv4 } from 'uuid';
import { Api } from '../../../utils/utils';
import Error from '../error/Error';
import CardLoader from '../card-loader/CardLoader';
import { setModal } from '../../../store/homeSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

const Modal = () => {
  const dispatch = useAppDispatch();

  const [error, setError] = useState<{ errorMessage: string }>({ errorMessage: '' });

  const modal = useAppSelector((state) => state.home.modal);

  useEffect(() => {
    const api: Api = new Api();
    api
      .getCharacterById(String(modal.card!.id))
      .then((card) => {
        setError({ errorMessage: '' });
        dispatch(
          setModal({ showModal: true, card: card as unknown as ICharacter, loading: false })
        );
      })
      .catch((err: Error) => {
        setError({ errorMessage: err.message });
      });
  }, []);

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
