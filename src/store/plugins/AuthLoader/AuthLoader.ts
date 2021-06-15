import { StoreType, StateType } from '@/types';
import { environment } from '@/config';

const AuthLoader = (store: StoreType) => {
  store.subscribe((...args: Array<StateType>) => {
    const state = args[1];
    if (!state.Auth.user && state.Auth.loading) {
      store.dispatch('Auth/currentAuthenticatedUser').then(() => {
        if (!state.Auth.user) {
          const { LEGACY_AUTH_USER, LEGACY_AUTH_PASSWORD } = environment;
          const username = LEGACY_AUTH_USER;
          const password = LEGACY_AUTH_PASSWORD;
          store.dispatch('Auth/signIn', { username, password }).catch((error) => {
            store.commit('Errors/setError', error);
          });
        }
      });
    }
  });
};

export default AuthLoader;
