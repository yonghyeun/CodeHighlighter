import { useState, useEffect } from "react";
import type { Options } from "./types";

export const createStore = <S>(
  initialState: S,
  options?: Partial<Options<S>>
) => {
  const store = Object.assign({}, initialState);
  const callbacks = new Set<() => void>();
  const { middlewares } = options || {};

  const setState = (newState: Partial<S>) => {
    const middleWareState =
      middlewares?.reduce((acc, middleware) => {
        return { ...acc, ...middleware(acc) };
      }, newState) || newState;

    Object.assign(store, middleWareState);
    callbacks.forEach((callback) => callback());
  };

  const useStore = <R>(selector: (state: S) => R) => {
    const [state, setState] = useState(selector(store));

    useEffect(() => {
      const callback = () => setState(selector(store));
      callbacks.add(callback);

      return () => {
        callbacks.delete(callback);
      };
    }, [selector]);

    return state;
  };

  useStore.setState = setState;

  return useStore;
};
