import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { Inject } from 'inversify-props';
import { IFetchableById } from '@/services';
import { Asset } from '@/models';
import { assetsMock } from './AssetsMock';

@Module({ namespaced: true })
export default class Assets extends VuexModule {
  public asset: Asset | null = null;

  public assets: Asset[] = assetsMock; // TODO: get assets from repository (or Repository mock)

  @Inject('AssetRepository')
  private assetRepository: IFetchableById<Asset>;

  @Mutation
  setAsset(asset: Asset) {
    this.asset = asset;
  }

  @Action
  public async loadAssetById(assetId: string): Promise<void> {
    return this.assetRepository
      .getById(assetId)
      .then((asset: Asset) => {
        this.context.commit('setAsset', asset);
        return Promise.resolve();
      })
      .catch((error) => {
        this.context.commit('Errors/setError', error, { root: true });
        return Promise.reject();
      });
  }

  @Action
  public flushAsset() {
    this.context.commit('setAsset', null);
  }
}
