import { StoreType, StateType, MutationType } from '@/types';

// TODO: remove custom StoreType etc. Use { Store, Plugin } from 'vuex'
const AssetLoader = (store: StoreType) => {
  store.subscribe((mutation: MutationType, state: StateType) => {
    // TODO: I would remove all auth checks from here -> separation of concerns
    if (mutation.type === 'route/ROUTE_CHANGED' || mutation.type === 'Auth/setUser') {
      if (state.Auth.user) {
        const { params } = state.route;
        if (params?.assetId) {
          const { assetId } = params;
          const { asset } = state.Assets;
          if (!asset || asset.id !== assetId) {
            store.dispatch<string>('Assets/loadAssetById', assetId);
          }
        } else {
          store.dispatch('Assets/flushAsset');
        }
      }
    }
  });
};

export default AssetLoader;
