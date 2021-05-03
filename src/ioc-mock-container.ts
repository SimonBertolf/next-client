import { cid } from 'inversify-props';
import { IKpiService, KpiMockService } from '@/services';
import { ContainerManager, IContainerManager } from './inversify';

const container: IContainerManager = new ContainerManager();

container.resetIOCContainer();
container.buildContainer();

container.mockSingleton<IKpiService>(cid.KpiService, KpiMockService);
