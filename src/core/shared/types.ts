export type Maybe<T> = T | null | undefined;

export type Id = string;

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type ValueOf<T> = T[keyof T];
