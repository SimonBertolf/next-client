import { Asset } from '@/models';
import { assetMock } from '@/../__mocks__/AssetMocks';
import { IFetchableById } from '../../interfaces';

class AssetMockRepository implements IFetchableById<Asset> {
  private assets: Asset[];

  constructor() {
    this.assets = [assetMock];
  }

  getById(id: number): Promise<Asset> {
    const asset: Asset | undefined = this.assets.find((a) => id === a.id);
    if (asset) return Promise.resolve(asset);
    return Promise.reject(new Error(`asset with id ${id} not found`));
  }
}

export default AssetMockRepository;
