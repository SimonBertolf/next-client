type ConstructorType<T = unknown> =
  | {
      new (...args: unknown[]): T;
    }
  | unknown;

export default ConstructorType;
