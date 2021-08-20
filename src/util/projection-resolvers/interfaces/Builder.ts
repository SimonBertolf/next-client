import { ProjectionResolverInterface } from './Resolver';

export interface ProjectionResolverBuilderInterface {
  addResolutionResolver(): ProjectionResolverBuilderInterface;
  build(): ProjectionResolverInterface;
}
