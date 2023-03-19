import Card from '../card/Card';
import React from 'react';
import styles from './Main.module.css';
import database from '../../database/database';
import ICharacter from 'interfaces/interfaces';

const Main = () => {
  return (
    <main className={styles.main}>
      {database.map((character: ICharacter) => (
        <Card
          key={character.id}
          id={character.id}
          name={character.name}
          description={character.description}
          img={character.img}
          gender={character.gender}
          occupation={character.occupation}
          dateOfBirth={character.dateOfBirth}
          age={character.age}
        />
      ))}
    </main>
  );
};

export default Main;
