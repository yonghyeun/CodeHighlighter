import { useEffect } from 'react';

export const useSyncronizeLocalStorage = (
  key: string,
  value: any,
  callback: (storedValue: any) => void,
) => {
  useEffect(() => {
    const storedValue = localStorage.getItem(key);

    if (storedValue === null || storedValue === value) {
      return;
    }

    callback(storedValue);
  }, []);
};
