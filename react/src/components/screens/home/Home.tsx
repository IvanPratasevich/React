import CardsList from '../../ui/cards-list/CardsList';
import React from 'react';
import Main from '../../../structure/main/Main';
import SearchBar from '../../ui/search-bar/SearchBar';

const Home = () => (
  <Main
    components={[
      SearchBar,
      () => <CardsList page="Home" cardsList={[]} hiddenDataArr={['img', 'name', 'dateOfBirth']} />,
    ]}
  />
);

export default Home;
