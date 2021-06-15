import axios, { AxiosStatic } from 'axios';
import { Asset } from '@/models';
import { IFetchableById } from '../../interfaces';

class AssetRepository implements IFetchableById<Asset> {
  private client: AxiosStatic;

  constructor() {
    this.client = axios;
  }

  getById(id: number): Promise<Asset> {
    const params = new URLSearchParams();
    params.append('assetId', id.toString());
    const options = { headers: { 'content-type': 'application/x-www-form-urlencoded' } };
    return this.client
      .get('/server.php?module=IO_Asset&action=getAssetPanel', { params, ...options })
      .then(({ data }) => data)
      .then((asset: { id: number; name: string }) => {
        const { name } = asset;
        return Promise.resolve({
          id: Number(asset.id),
          name,
        });
      });
  }
}

export default AssetRepository;
