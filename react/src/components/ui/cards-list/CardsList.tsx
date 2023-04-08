import Card from '../card/Card';
import React from 'react';
import { ICharacter } from '../../../models/interfaces';
import { v4 as uuidv4 } from 'uuid';
import Error from '../error/Error';

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
    <Error errorMessage={'Cards not found!'} />
  );
};

export default CardsList;
