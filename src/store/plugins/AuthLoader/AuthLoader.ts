import { StoreType, StateType } from '@/types';

const AuthLoader = (store: StoreType) => {
  store.subscribe((...args: Array<StateType>) => {
    const state = args[1];
    if (!state.Auth.user) {
      store.dispatch('Auth/currentAuthenticatedUser').then(() => {
        if (!state.Auth.user) {
          store.dispatch('Auth/signIn', { username: 'eb', password: 'raster23' });
        }
      });
    }
  });
};

export default AuthLoader;
