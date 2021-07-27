import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { Inject } from 'inversify-props';
import type { IFetchableById } from '@/services';
import type { Asset } from '@/models';
import { assetsMock } from './AssetsMock';

@Module({ namespaced: true })
export default class Assets extends VuexModule {
  public asset: Asset | null = null;

  public assets: Asset[] = assetsMock; // TODO: get assets from repository (or Repository mock)

  @Inject('AssetRepository')
  private assetRepository: IFetchableById<Asset>;

  @Mutation
  setAsset(asset: Asset): void {
    this.asset = asset;
  }

  @Mutation
  public flushAsset(): void {
    this.asset = null;
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
