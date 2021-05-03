import { ConstructorType } from '@/types';

interface IContainerManager {
  resetIOCContainer(): void;
  buildContainer(): void;
  mockSingleton<T>(id: string | symbol, service: ConstructorType<T>): void;
  mockTransient<T>(id: string | symbol, service: ConstructorType<T>): void;
}

export default IContainerManager;
