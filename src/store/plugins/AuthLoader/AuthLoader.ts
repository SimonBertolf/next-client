import { StoreType, StateType } from '@/types';

const DISABLE_LEGACY_AUTH = process.env.VUE_APP_DISABLE_LEGACY_AUTH || false;
// eslint-disable-next-line no-console
if (DISABLE_LEGACY_AUTH) console.warn('Legacy authentication is disabled');

// TODO: move logic to ProtectedRoute
// TODO: auth loader logic should only run for protected routes. App should not crash if auth request fails
const AuthLoader = (store: StoreType) => {
  store.subscribe((...args: Array<StateType>) => {
    if (!DISABLE_LEGACY_AUTH) {
      const state = args[1];
      if (!state.Auth.user) {
        store.dispatch('Auth/currentAuthenticatedUser').then(() => {
          if (!state.Auth.user) {
            store.dispatch('Auth/signIn', { username: 'eb', password: 'raster23' });
          }
        });
      }
    }
  });
};

export default AuthLoader;
