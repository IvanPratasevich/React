import CardsList from '../../ui/cards-list/CardsList';
import React, { useEffect } from 'react';
import styles from './Home.module.css';
import SearchBar from '../../ui/search-bar/SearchBar';
import { Api, generateArr } from '../../../utils/utils';
import CardLoader from '../../ui/card-loader/CardLoader';
import { v4 as uuidv4 } from 'uuid';
import Error from '../../ui/error/Error';
import { createPortal } from 'react-dom';
import Modal from '../../ui/modal/Modal';
import { setCharacters, setError, setLoading } from '../../../store/homeSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { ICharacter } from '../../../models/interfaces';

const Home = () => {
  const dispatch = useAppDispatch();

  const searchState = useAppSelector((state) => state.home.search);

  const characters = useAppSelector((state) => state.home.characters);

  const loading = useAppSelector((state) => state.home.loading);

  const error = useAppSelector((state) => state.home.error);

  const modal = useAppSelector((state) => state.home.modal);

  const api: Api = new Api();

  useEffect(() => {
    setTimeout(() => {
      api
        .getCharacters(searchState.searchValue!)
        .then((data) => {
          dispatch(setError({ errorMessage: '' }));
          dispatch(setCharacters({ characters: data as ICharacter[] }));
          dispatch(setLoading({ loading: false }));
        })
        .catch((err: Error) => {
          dispatch(setError({ errorMessage: err.message }));
        });
    }, 2000);
  }, [searchState]);

  return (
    <>
      <main className={styles.main}>
        <>
          <SearchBar />
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
            />
          )}
        </>
      </main>
      {modal.showModal && createPortal(<Modal />, document.body)}
    </>
  );
};

export default Home;
