import { QueryInterface } from '@/types';
import axios, { AxiosStatic } from 'axios';
import { IRepository } from '../../interfaces';

abstract class GenericLegacyRepository<Model> implements IRepository<Model> {
  protected client: AxiosStatic = axios;

  protected api: string;

  constructor() {
    this.api = '/legacy/server';
  }

  async getById(_id: string): Promise<Model> {
    throw Error(`method not implemented, args: ${_id}`);
  }

  async list(query?: QueryInterface): Promise<Model[]> {
    throw Error(`method not implemented, args: ${query}`);
  }

  async update(entity: Partial<Model>): Promise<Model> {
    throw Error(`method not implemented, args: ${entity}`);
  }

  async create(entity: Omit<Model, '_id'>): Promise<Model> {
    throw Error(`method not implemented, args: ${entity}`);
  }

  async delete(_id: string): Promise<Model> {
    throw Error(`method not implemented, args: ${_id}`);
  }

  protected async requestLegacy<ApiModel>(
    method = 'get',
    module: string,
    action: string,
    params: { [key: string]: unknown },
  ): Promise<ApiModel> {
    const controller = `${this.api}?module=${module}&action=${action}`;
    let request;
    switch (method) {
      case 'get':
        request = this.client.get(controller, { params });
        break;
      case 'post':
        request = this.client.post(controller, { ...params });
        break;
      default:
        throw Error(`request method: ${method} not implemented`);
    }
    const res = await request;
    const { data } = res;
    const { data: apiModel } = data.data;
    return apiModel as ApiModel;
  }
}

export default GenericLegacyRepository;
