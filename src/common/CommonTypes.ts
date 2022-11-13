export type Nil = null | undefined;

export type Maybe<T> = T | Nil;

export type Id = number;

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFunction = (...args: any) => any;
