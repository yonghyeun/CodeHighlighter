export type MiddleWare<S> = (newState: Partial<S>) => Partial<S>;

export interface Options<S> {
  middlewares: MiddleWare<S>[];
  synchronizeKeys: (keyof S)[];
}
