import { ProjectionResolver } from './Resolver';

export interface ProjectionResolverBuilder {
  build(): ProjectionResolver;
}
