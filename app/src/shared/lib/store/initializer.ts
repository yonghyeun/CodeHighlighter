import type { Initializer } from "./types";

export const createLocalStorageInitializer =
  <S>(initializerKeys: (keyof S)[]): Initializer<S> =>
  (state, setState) => {
    const keys = Object.keys(state) as (keyof S)[];

    keys.forEach((key) => {
      if (initializerKeys.includes(key)) {
        const value = localStorage.getItem(String(key));
        if (value === null) {
          return;
        }
        setState({ [key]: value } as Partial<S>);
      }
    });
  };
