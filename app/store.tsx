'use client';

import { configureStore } from '@reduxjs/toolkit';

import snippetReducer from '@/feature/snippet/snippetSlice';
import settingReducer from '@/feature/setting/settingSlice';

const store = configureStore({
  reducer: {
    snippet: snippetReducer,
    setting: settingReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatcher = typeof store.dispatch;
