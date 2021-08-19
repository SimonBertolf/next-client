import { ProjectionResolverContext } from './Context';

export interface ProjectionResolver {
  resolve(ctx: ProjectionResolverContext): ProjectionResolverContext;
  setNext(resolver: ProjectionResolver): void;
}
