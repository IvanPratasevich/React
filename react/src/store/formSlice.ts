import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FormState, SetCardsAction } from '../models/interfaces';

const initialState: FormState = {
  cards: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setCards(state, action: PayloadAction<SetCardsAction>) {
      state.cards.push(action.payload.card);
    },
  },
});

export const { setCards } = formSlice.actions;

export default formSlice.reducer;
