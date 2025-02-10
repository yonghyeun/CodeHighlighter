import type { MiddleWare } from "./types";

export const createLocalStorageMiddleware = <S>(
  persistKeys: (keyof S)[]
): MiddleWare<S> => {
  return (newState) => {
    persistKeys.forEach((key) => {
      const value = newState[key];
      if (value === undefined) {
        return;
      }

      if (typeof value === "string") {
        localStorage.setItem(String(key), value);
      } else {
        localStorage.setItem(String(key), JSON.stringify(value));
      }
    });

    return newState;
  };
};

export const createHtmlCSSPropertyMiddleware = <S>(
  cssPropertyKeys: (keyof S)[]
): MiddleWare<S> => {
  return (newState) => {
    cssPropertyKeys.forEach((key) => {
      const value = newState[key];

      if (value === undefined) {
        return;
      }

      document.documentElement.style.setProperty(
        `--${String(key)}`,
        String(value)
      );
    });

    return newState;
  };
};
