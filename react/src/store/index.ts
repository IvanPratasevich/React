import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';
import homeReducer from './homeSlice';
import { cyberpunkApi } from './cyberpunkApi';
const store = configureStore({
  reducer: {
    home: homeReducer,
    form: formReducer,
    [cyberpunkApi.reducerPath]: cyberpunkApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cyberpunkApi.middleware),
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
