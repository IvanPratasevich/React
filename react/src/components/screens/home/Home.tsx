import CardsList from '../../ui/cards-list/CardsList';
import React, { useEffect } from 'react';
import styles from './Home.module.css';
import SearchBar from '../../ui/search-bar/SearchBar';
import { generateArr } from '../../../utils/utils';
import CardLoader from '../../ui/card-loader/CardLoader';
import { v4 as uuidv4 } from 'uuid';
import Error from '../../ui/error/Error';
import { createPortal } from 'react-dom';
import Modal from '../../ui/modal/Modal';
import { setCharacters, setError, setLoading } from '../../../store/homeSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { ICharacter } from '../../../models/interfaces';
import { useGetCharactersQuery } from '../../../store/cyberpunkApi';

const Home = () => {
  const dispatch = useAppDispatch();

  const searchState = useAppSelector((state) => state.home.search);

  const { data, error: queryError, isSuccess } = useGetCharactersQuery(searchState.searchValue);

  const characters = useAppSelector((state) => state.home.characters);

  const error = useAppSelector((state) => state.home.error);

  const loading = useAppSelector((state) => state.home.loading);

  const modal = useAppSelector((state) => state.home.modal);

  useEffect(() => {
    if (queryError) {
      if ('status' in queryError) {
        dispatch(setError({ errorMessage: JSON.stringify(queryError.data) }));
      } else {
        dispatch(setError({ errorMessage: 'Error!' }));
      }
    }

    if (isSuccess) {
      dispatch(setError({ errorMessage: '' }));
      dispatch(setCharacters({ characters: data as ICharacter[] }));
      dispatch(setLoading({ loading: false }));
    }
  }, [data, queryError]);

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
