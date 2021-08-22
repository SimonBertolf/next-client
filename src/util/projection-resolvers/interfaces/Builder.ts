import { ProjectionResolverInterface } from './Resolver';

export interface ProjectionResolverBuilderInterface {
  addInputResolver(): ProjectionResolverBuilderInterface;
  addResolutionResolver(): ProjectionResolverBuilderInterface;
  addInputActualsResolver(): ProjectionResolverBuilderInterface;
  addSectionActualsResolver(): ProjectionResolverBuilderInterface;
  addHorizintalSumResolver(): ProjectionResolverBuilderInterface;
  build(): ProjectionResolverInterface;
}
