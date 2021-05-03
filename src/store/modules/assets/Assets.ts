import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { Inject } from 'inversify-props';
import { IFetchableById } from '@/services';
import { Asset } from '@/models';

@Module({ namespaced: true })
export default class Assets extends VuexModule {
  public asset: Asset | null = null;

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
}
