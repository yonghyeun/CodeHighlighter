import { useState, useEffect } from "react";

export const createStore = <S>(initialState: S) => {
  const store = Object.assign({}, initialState);
  const callbacks = new Set<() => void>();

  const setState = (newState: Partial<S>) => {
    Object.assign(store, newState);
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
