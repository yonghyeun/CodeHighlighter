import { configureStore } from "@reduxjs/toolkit";
import { snippetReducer } from "@/features/snippet/model";
import { settingReducer } from "@/features/setting/model";

export const makeStore = () => {
  return configureStore({
    reducer: {
      snippet: snippetReducer,
      setting: settingReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
