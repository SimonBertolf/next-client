interface StoreType {
  subscribe(callback: Function): void;
  dispatch<T = undefined, R = void>(action: string, param?: T): Promise<R>;
  commit<T>(commit: string, param: T): void;
}

export default StoreType;
