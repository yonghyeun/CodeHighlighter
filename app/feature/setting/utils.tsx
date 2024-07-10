export const getLocalStorageValue = (key: string, defaultValue: string) => {
  if (typeof window === 'undefined') {
    return defaultValue;
  }

  const storedValue = localStorage.getItem(key);

  return storedValue ? storedValue : defaultValue;
};
