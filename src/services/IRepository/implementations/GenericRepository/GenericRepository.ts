import { QueryInterface } from '@/types';
import axios, { AxiosStatic } from 'axios';
import { Document } from '@/models/Document';
import { IRepository } from '../../interfaces';

abstract class GenericRepository<Model extends Document> implements IRepository<Model> {
  protected client: AxiosStatic = axios;

  protected api: string;

  constructor(api: string) {
    this.api = api;
  }

  async getById(_id: string): Promise<Model> {
    if (!_id) throw new Error('Can not get a document with undefined _id.');
    const response = await this.client.get(`${this.api}/${_id}`);
    const { data } = response;
    const { data: document } = data;
    return document as Model;
  }

  async list(query?: QueryInterface): Promise<Model[]> {
    const response = await this.client.get(`${this.api}`, { params: query });
    const { data } = response;
    const { data: documents } = data;
    return documents as Model[];
  }

  async update(entity: Partial<Model>): Promise<Model> {
    const { _id } = entity;
    if (!_id) throw new Error('Can not update a document with undefined _id.');
    const updates = { ...entity };
    const response = await this.client.put(`${this.api}/${_id}`, updates);
    const { data } = response;
    const { data: document } = data;
    return document as Model;
  }

  async create(entity: Omit<Model, '_id'>): Promise<Model> {
    const newDocument = { ...entity };
    const response = await this.client.post(`${this.api}`, newDocument);
    const { data } = response;
    const { data: document } = data;
    return document as Model;
  }

  async delete(_id: string): Promise<Model> {
    const response = await this.client.delete(`${this.api}/${_id}`);
    const { data } = response;
    const { data: document } = data;
    return document as Model;
  }
}

export default GenericRepository;
