export const getLocalStorageValue = (key: string, defaultValue: string) => {
  if (typeof window === 'undefined') {
    return defaultValue;
  }

  const storedValue = localStorage.getItem(key);

  return storedValue ? storedValue : defaultValue;
};

export const debounce = <T extends (...arg: any[]) => void>(
  callback: T,
  delay: number,
) => {
  let timerId: ReturnType<typeof setTimeout>;

  return (...arg: Parameters<T>) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      callback(...arg);
    }, delay);
  };
};
