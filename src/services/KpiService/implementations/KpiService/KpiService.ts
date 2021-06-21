import axios, { AxiosResponse, AxiosStatic } from 'axios';
import { KpiGroup, Kpi, ApiResponseBody } from '@/models';
import { injectable } from 'inversify-props';
import { IKpiService } from '../../interfaces';

@injectable()
class KpiService implements IKpiService {
  private client: AxiosStatic = axios;

  async loadAssetKpis(assetId: string | number): Promise<KpiGroup[]> {
    const params = new URLSearchParams();
    params.append('LigID', assetId as string);
    const today = new Date(Date.now());
    params.append('year', today.getFullYear().toString());
    params.append('month', (today.getMonth() + 1).toString());
    const options = { headers: { 'content-type': 'application/x-www-form-urlencoded' } };
    return this.client
      .get('/legacy/server?module=IO_Liegenschaft&action=getExklKpi', { params, ...options })
      .then(({ data: apiResponse }: AxiosResponse<ApiResponseBody>) => {
        const { data: kpis } = apiResponse;
        const kpiGroups = [
          {
            id: Math.random().toString(36),
            category: 'Exklusive Kpis',
            kpis: kpis.map(({ label, value, format }: Kpi) => {
              let trend = 0;
              if (value < 0) trend = -1;
              if (value > 0) trend = 1;
              return {
                id: Math.random().toString(36),
                label,
                value,
                format,
                trend,
              };
            }),
          },
          {
            id: Math.random().toString(36),
            category: 'Exklusive Kpis',
            kpis: kpis.map(({ label, value, format }: Kpi) => {
              let trend = 0;
              if (value < 0) trend = -1;
              if (value > 0) trend = 1;
              return {
                id: Math.random().toString(36),
                label,
                value,
                format,
                trend,
              };
            }),
          },
          {
            id: Math.random().toString(36),
            category: 'Exklusive Kpis',
            kpis: kpis.map(({ label, value, format }: Kpi) => {
              let trend = 0;
              if (value < 0) trend = -1;
              if (value > 0) trend = 1;
              return {
                id: Math.random().toString(36),
                label,
                value,
                format,
                trend,
              };
            }),
          },
          {
            id: Math.random().toString(36),
            category: 'Exklusive Kpis',
            kpis: kpis.map(({ label, value, format }: Kpi) => {
              let trend = 0;
              if (value < 0) trend = -1;
              if (value > 0) trend = 1;
              return {
                id: Math.random().toString(36),
                label,
                value,
                format,
                trend,
              };
            }),
          },
          {
            id: Math.random().toString(36),
            category: 'Exklusive Kpis',
            kpis: kpis.map(({ label, value, format }: Kpi) => {
              let trend = 0;
              if (value < 0) trend = -1;
              if (value > 0) trend = 1;
              return {
                id: Math.random().toString(36),
                label,
                value,
                format,
                trend,
              };
            }),
          },
        ];
        return Promise.resolve(kpiGroups);
      });
  }
}

export default KpiService;
