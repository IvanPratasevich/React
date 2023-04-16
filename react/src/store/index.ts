import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';
import homeReducer from './homeSlice';
const store = configureStore({
  reducer: {
    home: homeReducer,
    form: formReducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
