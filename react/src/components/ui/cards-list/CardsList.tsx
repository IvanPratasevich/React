import Card from '../card/Card';
import React from 'react';
import styles from './CardsList.module.css';
import { ICharacter } from '../../../models/interfaces';
import { v4 as uuidv4 } from 'uuid';

const CardsList = (props: { page: string; cardsList: ICharacter[]; hiddenDataArr: string[] }) => {
  const { cardsList, hiddenDataArr } = props;
  const characters = cardsList;

  return (
    <div data-testid="container" className={styles.container}>
      {characters.map((character: ICharacter) => (
        <Card key={uuidv4()} data-testid="card" character={character} hiddenData={hiddenDataArr} />
      ))}
    </div>
  );
};

export default CardsList;
