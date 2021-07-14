import { KpiGroup } from '@/models';

export interface IKpiService {
  loadAssetKpis(assetId: string | number): Promise<KpiGroup[]>;
}
