import { ProjectionResolverInterface } from './Resolver';

export interface ProjectionResolverBuilderInterface {
  addInputsResolver(): ProjectionResolverBuilderInterface;
  addResolutionResolver(): ProjectionResolverBuilderInterface;
  addInputActualsResolver(): ProjectionResolverBuilderInterface;
  addSectionActualsResolver(): ProjectionResolverBuilderInterface;
  addHorizintalSumResolver(): ProjectionResolverBuilderInterface;
  addInputsSumResolver(): ProjectionResolverBuilderInterface;
  addActualsSumResolver(): ProjectionResolverBuilderInterface;
  addAbsoluteDeltaResolver(): ProjectionResolverBuilderInterface;
  addRelativeDeltaResolver(): ProjectionResolverBuilderInterface;
  build(): ProjectionResolverInterface;
}
