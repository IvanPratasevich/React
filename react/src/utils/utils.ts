import { apiKey, apiUrl } from '../constants/constants';
import { ICharacter, IErrorResponse, IGiphyResponse } from '../models/interfaces';

const capitalizeFirstLetter = (str: string): string =>
  str.length > 0 ? `${str[0].toUpperCase()}${str.slice(1)}` : '';

const saveToLocalStore = (inputValue: string): void => {
  localStorage.setItem('inputValue', inputValue);
};

class Api {
  private url: string;

  constructor(url = apiUrl) {
    this.url = url;
  }

  public async getCharacters(name: string): Promise<ICharacter[] | Error> {
    try {
      const response: Response = await fetch(
        name === '' ? `${this.url}/characters` : `${this.url}/characters/name/${name}`
      );

      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    } catch (err) {
      if (err) {
        throw new Error(`${(err as IErrorResponse).message}`);
      } else {
        throw new Error('Error');
      }
    }
  }

  public async getGifs(name: string): Promise<IGiphyResponse | Error> {
    try {
      const url = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${name}`;
      const response: Response = await fetch(url);

      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error('Error');
      }
    }
  }

  public async getCharacterById(id: string): Promise<ICharacter[] | Error> {
    try {
      const response: Response = await fetch(`${this.url}/characters/id/${id}`);

      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error('Error');
      }
    }
  }
}

const generateArr = (length: number): number[] => [...Array(length)].map(() => 0);

export { capitalizeFirstLetter, saveToLocalStore, Api, generateArr };
