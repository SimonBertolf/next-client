import { injectable } from 'inversify-props';
import { Dashboard } from '@/models';
import { GenericRepository } from '../GenericRepository';

@injectable()
export class DashboardRepository extends GenericRepository<Dashboard> {
  constructor() {
    super('/api/v1/dashboards');
  }
}
