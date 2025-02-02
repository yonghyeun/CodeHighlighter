'use client';

import { useRef } from 'react';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import snippetReducer from '@/feature/snippet/snippetSlice';
import settingReducer from '@/feature/setting/settingSlice';

const makeStore = () => {
  return configureStore({
    reducer: {
      snippet: snippetReducer,
      setting: settingReducer,
    },
  });
};

type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatcher = AppStore['dispatch'];

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const store = useRef<AppStore | null>(null);

  if (!store.current) {
    store.current = makeStore();
  }

  return <Provider store={store.current}>{children}</Provider>;
};
