import CardsList from '../../ui/cards-list/CardsList';
import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import SearchBar from '../../ui/search-bar/SearchBar';
import { Api, generateArr } from '../../../utils/utils';
import { ICharacter } from 'models/interfaces';
import CardLoader from '../../ui/card-loader/CardLoader';
import { v4 as uuidv4 } from 'uuid';

import Error from '../../ui/error/Error';
import { createPortal } from 'react-dom';
import Modal from '../../ui/modal/Modal';

const Home = () => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);

  const [loading, isLoading] = useState<boolean>(true);

  const [searchState, setSearchValue] = useState<{ searchValue: null | string; loaded: boolean }>({
    searchValue: null,
    loaded: false,
  });

  const [error, setError] = useState<{ errorMessage: string }>({ errorMessage: '' });

  const [stateModal, setStateModal] = useState<{ showModal: boolean; card: ICharacter | null }>({
    showModal: false,
    card: null,
  });

  const api: Api = new Api();

  useEffect(() => {
    if (searchState.searchValue !== null && searchState.loaded) {
      setTimeout(() => {
        api
          .getCharacters(searchState.searchValue!)
          .then((data) => {
            setError({ errorMessage: '' });
            setCharacters(data as ICharacter[]);
            isLoading(false);
          })
          .catch((err: Error) => {
            setError({ errorMessage: err.message });
          });
      }, 5000);
    }
  }, [searchState]);

  return (
    <>
      <main className={styles.main}>
        <>
          <SearchBar setSearchValue={setSearchValue} isLoading={isLoading} />
          {error.errorMessage ? (
            <Error errorMessage={error.errorMessage} />
          ) : loading ? (
            <div className="container">
              {generateArr(3).map(() => {
                return <CardLoader key={uuidv4()} />;
              })}
            </div>
          ) : (
            <CardsList
              previewMode={true}
              page="Home"
              cardsList={characters}
              hiddenDataArr={[
                'img',
                'name',
                'dateOfBirth',
                'id',
                'description',
                'gender',
                'occupation',
                'age',
              ]}
              setStateModal={setStateModal}
            />
          )}
        </>
      </main>
      {stateModal.showModal &&
        createPortal(
          <Modal stateModal={stateModal} setStateModal={setStateModal} />,
          document.body
        )}
    </>
  );
};

export default Home;
