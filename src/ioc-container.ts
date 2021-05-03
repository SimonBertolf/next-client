import { ContainerManager, IContainerManager } from './inversify';

const container: IContainerManager = new ContainerManager();

container.buildContainer();
