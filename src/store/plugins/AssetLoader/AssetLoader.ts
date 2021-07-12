import { Store, Plugin } from 'vuex';

// TODO: replace any with type of state
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AssetLoader: Plugin<any> = (store: Store<any>) => {
  store.subscribe((mutation, state) => {
    // TODO: I would remove all auth checks from here -> separation of concerns
    if (mutation.type === 'route/ROUTE_CHANGED' || mutation.type === 'Auth/setUser') {
      if (state.Auth.user) {
        const { params } = state.route;
        if (params?.assetId) {
          const { assetId } = params;
          const { asset } = state.Assets;
          if (!asset || asset.id !== assetId) {
            store.dispatch('Assets/loadAssetById', assetId);
          }
        } else if (state.Assets.asset) {
          store.commit('Assets/flushAsset');
        }
      }
    }
  });
};

export default AssetLoader;
