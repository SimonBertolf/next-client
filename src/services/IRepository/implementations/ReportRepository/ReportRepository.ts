import { injectable } from 'inversify-props';
import { Report } from '@/models';
import { GenericRepository } from '../GenericRepository';
import type { IRepositoryWithPdf } from '../../interfaces';

@injectable()
export class ReportRepository extends GenericRepository<Report> implements IRepositoryWithPdf<Report> {
  constructor() {
    super('/api/v1/reports');
  }

  async getPdfById(_id: string): Promise<Blob> {
    if (!_id) throw new Error('Can not get pdf of report with undefined _id.');

    const headers = { Accept: 'application/pdf' };

    // TODO: maybe increase timeout time
    const response = await this.client.get(`${this.api}/${_id}/pdf`, {
      headers,
      responseType: 'blob',
    });
    const { data: pdf } = response;
    return pdf;
  }
}
