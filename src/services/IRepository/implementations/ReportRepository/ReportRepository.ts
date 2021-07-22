import { injectable } from 'inversify-props';
import { Report } from '@/models';
import { GenericRepository } from '../GenericRepository';

@injectable()
export class ReportRepository extends GenericRepository<Report> {
  constructor() {
    super('/api/v1/reports');
  }
}
