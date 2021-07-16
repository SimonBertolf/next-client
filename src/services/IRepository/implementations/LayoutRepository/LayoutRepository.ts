import { injectable } from 'inversify-props';
import { ApiLayout } from '@/models';
import { GenericRepository } from '../GenericRepository';

@injectable()
export class LayoutRepository extends GenericRepository<ApiLayout> {
  constructor() {
    super('layouts');
  }
}
