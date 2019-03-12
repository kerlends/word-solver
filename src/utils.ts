export const isFunction = (obj: any): obj is Function =>
  typeof obj === 'function';

export const isObject = (obj: any): boolean =>
  obj !== null && typeof obj === 'object';

export const isInteger = (obj: any): boolean =>
  String(Math.floor(Number(obj))) === obj;

export const isString = (obj: any): obj is string =>
  Object.prototype.toString.call(obj) === '[object String]';

export const isNaN = (obj: any): boolean => obj !== obj;

export const isPromise = (value: any): value is PromiseLike<any> =>
  isObject(value) && isFunction(value.then);

export const parse = <T extends any = string>(value: string): T => {
  try {
    return JSON.parse(value);
  } catch (err) {
    return (value as any) as T;
  }
};
