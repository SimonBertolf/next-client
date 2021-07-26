import { Store, Plugin } from 'vuex';

// TODO: replace any with type of state
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AuthLoader: Plugin<any> = (store: Store<any>) => {
  store.subscribe((mutation, state) => {
    const { type } = mutation;
    if (type === 'route/ROUTE_CHANGED') {
      if (!state.Auth.user && state.Auth.loading) {
        store.dispatch('Auth/currentAuthenticatedUser');
      }
    }
  });
};

export default AuthLoader;
