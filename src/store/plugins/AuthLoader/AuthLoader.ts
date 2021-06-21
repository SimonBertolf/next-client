import { StoreType, StateType } from '@/types';

const AuthLoader = (store: StoreType) => {
  store.subscribe((...args: Array<StateType>) => {
    const state = args[1];
    if (!state.Auth.user && state.Auth.loading) {
      store.dispatch('Auth/currentAuthenticatedUser');
    }
  });
};

export default AuthLoader;
