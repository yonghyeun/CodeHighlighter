import { configureStore } from "@reduxjs/toolkit";
import { snippetReducer } from "@/snippet/model";
import { settingReducer } from "@/setting/model";

export const makeStore = () => {
  return configureStore({
    reducer: {
      snippet: snippetReducer,
      setting: settingReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
