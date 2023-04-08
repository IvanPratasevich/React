import CardsList from '../../ui/cards-list/CardsList';
import React, { useEffect, useState } from 'react';
import Main from '../../../structure/main/Main';
import SearchBar from '../../ui/search-bar/SearchBar';
import { Api } from '../../../utils/utils';
import { ICharacter } from 'models/interfaces';

const Home = () => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);

  useEffect(() => {
    const api: Api = new Api();
    api.getCharacters().then((data: ICharacter[]) => setCharacters(data));
  }, []);

  return (
    <Main
      components={[
        SearchBar,
        () => (
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
        ),
      ]}
    />
  );
};

export default Home;
