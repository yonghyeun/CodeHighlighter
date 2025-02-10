export type Initializer<S> = (
  state: Partial<S>,
  setState: SetStateAction<S>
) => void;

export type MiddleWare<S> = (newState: Partial<S>) => Partial<S>;

export interface Options<S> {
  middlewares: MiddleWare<S>[];
  initializers: Initializer<S>[];
}

export type SetStateAction<S> = (newState: Partial<S>) => void;
