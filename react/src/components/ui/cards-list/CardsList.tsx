import Card from '../card/Card';
import React from 'react';
import styles from './CardsList.module.css';
import { database } from '../../../database/database';
import { ICharacter } from '../../../models/interfaces';

const CardsList = () => {
  return (
    <div className={styles.container}>
      {database.map((character: ICharacter) => (
        <Card
          key={character.id.toString()}
          character={character}
          hiddenData={['img', 'name', 'dateOfBirth']}
        />
      ))}
    </div>
  );
};

export default CardsList;
