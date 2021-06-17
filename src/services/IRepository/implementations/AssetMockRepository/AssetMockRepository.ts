import { Asset } from '@/models';
import { assetsMock } from '@/../__mocks__/AssetMocks';
import { IFetchableById } from '../../interfaces';

class AssetMockRepository implements IFetchableById<Asset> {
  private assets: Asset[];

  constructor() {
    this.assets = assetsMock;
  }

  getById(id: string): Promise<Asset> {
    const asset: Asset | undefined = this.assets.find((a) => id === a.id);
    if (asset) return Promise.resolve(asset);
    return Promise.reject(new Error(`asset with id ${id} not found`));
  }
}

export default AssetMockRepository;
