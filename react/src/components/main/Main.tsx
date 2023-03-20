import Card from '../card/Card';
import React from 'react';
import styles from './Main.module.css';
import database from '../../database/database';
import ICharacter from '../../interfaces/interfaces';
import SearchBar from '../../components/ui/SearchBar/SearchBar';

const Main = () => {
  return (
    <main className={styles.main}>
      <SearchBar />
      <div className={styles.container}>
        {database.map((character: ICharacter) => (
          <Card key={character.id.toString()} character={character} />
        ))}
      </div>
    </main>
  );
};

export default Main;
