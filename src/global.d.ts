interface Set<T> {
  add(value: T): Set<T>;
  clear(): void;
  delete(value: T): boolean;
  entries(): Array<[T, T]>;
  forEach(
    callbackfn: (value: T, index: T, set: Set<T>) => void,
    thisArg?: any,
  ): void;
  has(value: T): boolean;
  keys(): Array<T>;
  size: number;
}

interface SetConstructor {
  new <T>(): Set<T>;
  new <T>(iterable: Array<T>): Set<T>;
  prototype: Set<any>;
}

declare var Set: SetConstructor;

declare module '*.txt' {
  const content: any;
  export default content;
}

declare module 'workerize-loader!*' {
  const value: any;
  export default value;
}

declare type ReturnType<T> = T extends (...args: any[]) => infer R
  ? R
  : any;
