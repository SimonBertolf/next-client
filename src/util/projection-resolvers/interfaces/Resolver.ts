import { ProjectionResolverContextInterface } from './Context';

export interface ProjectionResolverInterface {
  resolve(ctx: ProjectionResolverContextInterface): ProjectionResolverContextInterface;
  setNext(resolver: ProjectionResolverInterface): void;
}
