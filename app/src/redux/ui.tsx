import { makeStore, type AppStore } from "./model";
import { useRef } from "react";
import { Provider } from "react-redux";

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const store = useRef<AppStore | null>(null);

  if (!store.current) {
    store.current = makeStore();
  }

  return <Provider store={store.current}>{children}</Provider>;
};
