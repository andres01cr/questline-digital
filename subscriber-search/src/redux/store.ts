import { configureStore } from '@reduxjs/toolkit';
import subscribersReducer from './subscribersSlice';

export const store = configureStore({
  reducer: {
    subscribers: subscribersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;