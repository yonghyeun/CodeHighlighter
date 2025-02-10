import { configureStore } from "@reduxjs/toolkit";
import { snippetReducer } from "@/features/snippet/model";

export const makeStore = () => {
  return configureStore({
    reducer: {
      snippet: snippetReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
