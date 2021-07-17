import { container, Container } from 'inversify-props';
import { ConstructorType } from '@/types';
import { ApiLayout, Asset } from '@/models';
import {
  IDomDocument,
  DomDocument,
  IEventBus,
  EventBus,
  IAuth,
  Auth,
  AssetRepository,
  LayoutRepository,
  IFetchableById,
  IKpiService,
  KpiService,
  IRepository,
} from '@/services';
import { IContainerManager } from '../../interfaces';

class ContainerManager implements IContainerManager {
  private iocContainer: Container = container;

  resetIOCContainer(): void {
    this.iocContainer.unbindAll();
  }

  buildContainer(): void {
    this.iocContainer.addSingleton<IDomDocument>(DomDocument);
    this.iocContainer.addSingleton<IEventBus>(EventBus);
    this.iocContainer.addSingleton<IAuth>(Auth, 'IAuth');
    this.iocContainer.addSingleton<IFetchableById<Asset>>(AssetRepository, 'AssetRepository');
    this.iocContainer.addSingleton<IRepository<ApiLayout>>(LayoutRepository, 'LayoutRepository');
    this.iocContainer.addSingleton<IKpiService>(KpiService, 'KpiService');
  }

  mockSingleton<T>(id: string | symbol, service: ConstructorType<T>): void {
    this.iocContainer.unbind(id);
    this.iocContainer.addSingleton<T>(service, id);
  }

  mockTransient<T>(id: string | symbol, service: ConstructorType<T>): void {
    this.iocContainer.unbind(id);
    this.iocContainer.addTransient<T>(service, id);
  }
}

export default ContainerManager;
