import CardsList from '../../ui/cards-list/CardsList';
import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import SearchBar from '../../ui/search-bar/SearchBar';
import { Api, generateArr } from '../../../utils/utils';
import { ICharacter } from 'models/interfaces';
import CardLoader from '../../ui/card-loader/CardLoader';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);

  const [loading, isLoading] = useState<boolean>(true);

  const [searchState, setSearchValue] = useState<{ searchValue: null | string; loaded: boolean }>({
    searchValue: null,
    loaded: false,
  });

  const api: Api = new Api();

  useEffect(() => {
    if (searchState.searchValue !== null && searchState.loaded) {
      setTimeout(() => {
        api.getCharacters(searchState.searchValue!).then((data: ICharacter[]) => {
          setCharacters(data);
          isLoading(false);
        });
      }, 5000);
    }
  }, [searchState]);

  return (
    <main className={styles.main}>
      <>
        <SearchBar setSearchValue={setSearchValue} isLoading={isLoading} />
        {loading ? (
          <div className="container">
            {generateArr(6).map(() => {
              return <CardLoader key={uuidv4()} />;
            })}
          </div>
        ) : (
          <CardsList
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
  );
};

export default Home;
