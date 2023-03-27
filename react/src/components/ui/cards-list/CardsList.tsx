import Card from '../card/Card';
import React from 'react';
import styles from './CardsList.module.css';
import { database } from '../../../database/database';
import { ICharacter } from '../../../models/interfaces';
import { idGenerator } from '../../../utils/utils';

const CardsList = (props: { cardsList: ICharacter[]; hiddenDataArr: string[] }) => {
  const { cardsList, hiddenDataArr } = props;
  const characters = cardsList.length === 0 ? database : cardsList;
  return (
    <div className={styles.container}>
      {characters.map((character: ICharacter) => (
        <Card key={idGenerator()} character={character} hiddenData={hiddenDataArr} />
      ))}
    </div>
  );
};

export default CardsList;
