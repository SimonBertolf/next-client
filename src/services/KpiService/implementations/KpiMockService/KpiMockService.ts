import { KpiGroup } from '@/models';
import { injectable } from 'inversify-props';
import { kpiGroupList } from '@/../__mocks__/KpiGroupListMocks';
import { IKpiService } from '../../interfaces';

@injectable()
class KpiMockService implements IKpiService {
  async loadAssetKpis(): Promise<KpiGroup[]> {
    return Promise.resolve(kpiGroupList);
  }
}

export default KpiMockService;
