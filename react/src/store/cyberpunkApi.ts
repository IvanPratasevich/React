import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiUrl } from '../constants/constants';
import { ICharacter } from '../models/interfaces';

export const cyberpunkApi = createApi({
  reducerPath: 'cyberpunkApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  endpoints: (build) => ({
    getCharacters: build.query<ICharacter[], string>({
      query: (name) => (name ? `characters/name/${name}` : 'characters'),
    }),

    getCharacterById: build.query<ICharacter, string>({
      query: (id) => `characters/id/${id}`,
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterByIdQuery } = cyberpunkApi;
