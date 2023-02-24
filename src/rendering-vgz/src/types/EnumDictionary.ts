export type EnumDictionary<T extends string | symbol | number, U> = {
    [K in T]: U;
};

export type Record<K extends string, T> = {
    [P in K]: T;
}