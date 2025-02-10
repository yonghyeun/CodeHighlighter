import { useState, useEffect } from "react";
import type { Options, SetStateAction } from "./types";

export const createStore = <S>(
  initialState: S,
  options?: Partial<Options<S>>
) => {
  let store = Object.assign({}, initialState);
  const callbacks = new Set<() => void>();
  const { middlewares, initializers } = options || {};

  const setStore: SetStateAction<S> = (newState) => {
    const middleWareState =
      middlewares?.reduce((acc, middleware) => {
        return { ...acc, ...middleware(acc) };
      }, newState) || newState;

    store = { ...store, ...middleWareState };
    callbacks.forEach((callback) => callback());
  };

  const useStore = <R>(selector: (state: S) => R) => {
    const [state, setState] = useState(selector(store));

    useEffect(() => {
      const callback = () => setState(selector(store));
      callbacks.add(callback);

      initializers?.forEach((initializer) => initializer(store, setStore));

      return () => {
        callbacks.delete(callback);
      };
    }, []);

    return state;
  };

  useStore.setState = setStore;

  return useStore;
};
