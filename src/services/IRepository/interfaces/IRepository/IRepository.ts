import { QueryInterface } from '@/types';
import { IFetchableById } from '../IFetchableById';
import { ICreateable } from '../ICreateable';
import { IDeletable } from '../IDeletable';

export interface IRepository<R> extends IFetchableById<R>, ICreateable<R, R>, IDeletable<R> {
  list(query?: QueryInterface): Promise<Array<R>>;
  update(entity: Partial<R>): Promise<R>;
}
