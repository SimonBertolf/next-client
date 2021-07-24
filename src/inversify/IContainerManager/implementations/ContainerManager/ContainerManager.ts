import { container, Container } from 'inversify-props';
import { ConstructorType } from '@/types';
import { ApiLayout, Asset, Dashboard, Report } from '@/models';
import {
  IDomDocument,
  DomDocument,
  IEventBus,
  EventBus,
  IAuth,
  Auth,
  AssetRepository,
  LayoutRepository,
  DashboardRepository,
  IFetchableById,
  IKpiService,
  KpiService,
  IRepository,
  ReportRepository,
  IRepositoryWithPdf,
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
    this.iocContainer.addSingleton<IRepository<Dashboard>>(DashboardRepository, 'DashboardRepository');
    this.iocContainer.addSingleton<IRepositoryWithPdf<Report>>(ReportRepository, 'ReportRepository');
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
