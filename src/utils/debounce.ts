export const debounce = <T extends (...args: any[]) => void>(cb: T, delay = 1000) => {
    let timeout:number;
  
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb(...args);
      }, delay);
    };
};