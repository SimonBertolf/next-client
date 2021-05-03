import { container, cid } from 'inversify-props';
import { KpiService } from '@/services';

const kpiService: KpiService = container.get<KpiService>(cid.KpiService);

test('should do something', () => {
  expect<KpiService>(kpiService).toBeDefined();
});
