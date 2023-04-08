import Card from '../card/Card';
import React from 'react';
import { ICharacter } from '../../../models/interfaces';
import { v4 as uuidv4 } from 'uuid';

const CardsList = (props: { page: string; cardsList: ICharacter[]; hiddenDataArr: string[] }) => {
  const { cardsList, hiddenDataArr } = props;
  const characters = cardsList;

  return characters.length > 0 ? (
    <div data-testid="container" className="container">
      {characters.map((character: ICharacter) => (
        <Card key={uuidv4()} data-testid="card" character={character} hiddenData={hiddenDataArr} />
      ))}
    </div>
  ) : (
    <>
      <h1 style={{ margin: '0px' }}>Cards not found!</h1>
      <img
        height={'400px'}
        src="https://media.tenor.com/_JNUzeafQ4kAAAAC/keanu-reeves-glasses-off.gif"
      ></img>
    </>
  );
};

export default CardsList;
