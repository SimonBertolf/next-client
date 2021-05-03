import { QueryInterface } from '@/types';
import { IFetchableById } from '../IFetchableById';
import { ICreateable } from '../ICreateable';

interface IRepository<R> extends IFetchableById<R>, ICreateable<R, R> {
  list(query?: QueryInterface): Promise<Array<R>>;
  update(entity: R): Promise<R>;
}

export default IRepository;
