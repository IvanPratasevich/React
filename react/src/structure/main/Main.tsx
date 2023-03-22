import React from 'react';
import styles from './Main.module.css';
import SearchBar from '../../components/ui/search-bar/SearchBar';
import CardsList from '../../components/ui/cards-list/CardsList';

const Main = () => {
  return (
    <main className={styles.main}>
      <SearchBar />
      <CardsList />
    </main>
  );
};

export default Main;
