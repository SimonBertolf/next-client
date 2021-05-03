import { cid } from 'inversify-props';
import { IContainerManager, ContainerManager } from '@/inversify';

test('should bind application dependencies', () => {
  const iocContainer: IContainerManager = new ContainerManager();
  iocContainer.resetIOCContainer();
  iocContainer.buildContainer();
  expect<number>(Object.keys(cid).length).toBeGreaterThan(0);
});
