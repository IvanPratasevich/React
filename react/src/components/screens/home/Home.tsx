import CardsList from '../../ui/cards-list/CardsList';
import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import SearchBar from '../../ui/search-bar/SearchBar';
import { Api } from '../../../utils/utils';
import { ICharacter } from 'models/interfaces';

const Home = () => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);

  const [searchValue, setSearchValue] = useState<string>('');

  const api: Api = new Api();

  useEffect(() => {
    api
      .getCharacters(searchValue.length > 0 ? searchValue : null)
      .then((data: ICharacter[]) => setCharacters(data));
  }, [searchValue]);

  return (
    <main className={styles.main}>
      <>
        <SearchBar setSearchValue={setSearchValue} />
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
      </>
    </main>
  );
};

export default Home;
