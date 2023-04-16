import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IHomeState, ISetHomeAction } from '../models/interfaces';

const initialState: IHomeState = {
  search: {
    searchValue: '',
    loaded: true,
  },

  loading: true,

  characters: [],

  error: {
    errorMessage: '',
  },

  modal: {
    showModal: false,
    card: null,
    loading: false,
  },
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<ISetHomeAction>) {
      state!.search!.searchValue = action.payload.searchValue!;
      state.search.loaded = action.payload.loaded!;
    },

    setLoading(state, action: PayloadAction<ISetHomeAction>) {
      state.loading = action.payload.loading!;
    },

    setCharacters(state, action: PayloadAction<ISetHomeAction>) {
      state.characters = action.payload.characters!;
    },

    setError(state, action: PayloadAction<ISetHomeAction>) {
      state.error.errorMessage = action.payload.errorMessage!;
    },
    setModal(state, action: PayloadAction<ISetHomeAction>) {
      state.modal.showModal = action.payload.showModal!;
      state.modal.card = action.payload.card!;
      state.modal.loading = action.payload.loading!;
    },
  },
});

export const { setSearch, setLoading, setCharacters, setError, setModal } = homeSlice.actions;

export default homeSlice.reducer;
