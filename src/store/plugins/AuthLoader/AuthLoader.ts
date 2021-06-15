import { StoreType, StateType } from '@/types';

const AuthLoader = (store: StoreType) => {
  store.subscribe((...args: Array<StateType>) => {
    const state = args[1];
    if (!state.Auth.user && state.Auth.loading) {
      store.dispatch('Auth/currentAuthenticatedUser').then(() => {
        if (!state.Auth.user) {
          const username = process.env.VUE_APP_LEGACY_AUTH_USER;
          const password = process.env.VUE_APP_LEGACY_AUTH_PASSWORD;
          store.dispatch('Auth/signIn', { username, password });
        }
      });
    }
  });
};

export default AuthLoader;
