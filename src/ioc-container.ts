import { ContainerManager, IContainerManager } from './inversify';

export const initIocContainer = () => {
  const container: IContainerManager = new ContainerManager();
  container.buildContainer();
};
