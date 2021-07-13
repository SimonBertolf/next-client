import axios, { AxiosResponse, AxiosStatic } from 'axios';
import { ApiResponseBody, Asset } from '@/models';
import { IFetchableById } from '../../interfaces';

class AssetRepository implements IFetchableById<Asset> {
  private client: AxiosStatic;

  constructor() {
    this.client = axios;
  }

  async getById(id: string): Promise<Asset> {
    const params = new URLSearchParams();
    params.append('assetId', id);
    const options = { headers: { 'content-type': 'application/x-www-form-urlencoded' } };

    const axiosResponse: AxiosResponse<
      ApiResponseBody<Asset>
    > = await this.client.get('/legacy/server?module=IO_Asset&action=getAssetPanel', { params, ...options });

    const { data: apiResponse } = axiosResponse;

    const { data: asset } = apiResponse;

    // this error will never be thrown, because data is never undefined for GET request.
    if (!asset) throw new Error('Data on api response body is undefined');

    return asset;
  }
}

export default AssetRepository;
