import { cid } from 'inversify-props';
import { Asset } from '@/models';
import { IKpiService, KpiMockService, IFetchableById, AssetMockRepository, IAuth, AuthMock } from '@/services';
import { ContainerManager, IContainerManager } from './inversify';

export const mockContainer = () => {
  const container: IContainerManager = new ContainerManager();

  container.resetIOCContainer();
  container.buildContainer();

  container.mockSingleton<IAuth>(cid.IAuth, AuthMock);
  container.mockSingleton<IKpiService>(cid.KpiService, KpiMockService);
  container.mockSingleton<IFetchableById<Asset>>(cid.AssetRepository, AssetMockRepository);
};
