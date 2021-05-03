import { StoreType, StateType, MutationType } from '@/types';

const AssetLoader = (store: StoreType) => {
  store.subscribe((mutation: MutationType, state: StateType) => {
    if (mutation.type === 'route/ROUTE_CHANGED' || mutation.type === 'Auth/setUser') {
      if (state.Auth.user) {
        const { params } = state.route;
        if (params?.assetId) {
          const { assetId } = params;
          const { asset } = state.Assets;
          if (!asset || asset.id !== assetId) {
            store.dispatch<string>('Assets/loadAssetById', assetId);
          }
        }
      }
    }
  });
};

export default AssetLoader;
