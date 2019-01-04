export const isDefined = (value: any) => value !== undefined && value;

export const throwIfUndefined = (
  value: any,
  name: string,
  error?: string | Error,
) => {
  if (!isDefined(value)) {
    throw error ? error : new Error(`${name} was not provided`);
  }
};

export const objLength = (obj: any) => Object.keys(obj).length;
