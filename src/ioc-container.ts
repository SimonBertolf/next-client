import { ContainerManager, IContainerManager } from './inversify';

export const initIocContainer = (): void => {
  const container: IContainerManager = new ContainerManager();
  container.buildContainer();
};
