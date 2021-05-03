import { KpiGroup } from '@/models';

interface IKpiService {
  loadAssetKpis(assetId: string | number): Promise<KpiGroup[]>;
}

export default IKpiService;
