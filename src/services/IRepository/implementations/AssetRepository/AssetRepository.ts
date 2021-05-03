import axios, { AxiosStatic } from 'axios';
import { Asset } from '@/models';
import { IFetchableById } from '../../interfaces';

class AssetRepository implements IFetchableById<Asset> {
  private client: AxiosStatic;

  constructor() {
    this.client = axios;
  }

  getById(id: string): Promise<Asset> {
    const params = new URLSearchParams();
    params.append('assetId', id);
    const options = { headers: { 'content-type': 'application/x-www-form-urlencoded' } };
    return this.client
      .get('?module=IO_Asset&action=getAssetPanel', { params, ...options })
      .then(({ data }) => data)
      .then((asset: { id: string; name: string }) => {
        const { name } = asset;
        return Promise.resolve({
          id: asset.id,
          name,
        });
      });
  }
}

export default AssetRepository;
