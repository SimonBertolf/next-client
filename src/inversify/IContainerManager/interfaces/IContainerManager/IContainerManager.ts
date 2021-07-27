import { ConstructorType } from '@/types';

export interface IContainerManager {
  resetIOCContainer(): void;
  buildContainer(): void;
  mockSingleton<T>(id: string | symbol, service: ConstructorType<T>): void;
  mockTransient<T>(id: string | symbol, service: ConstructorType<T>): void;
}
