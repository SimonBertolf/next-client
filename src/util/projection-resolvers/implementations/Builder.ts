import { ProjectionResolverInterface, ProjectionResolverBuilderInterface } from '../interfaces';
import { ResolutionResolver } from './ResolutionResolver';

export class ProjectionResolverBuilder implements ProjectionResolverBuilderInterface {
  private resolver: ProjectionResolverInterface;

  addResolutionResolver(): ProjectionResolverBuilderInterface {
    const resolver = new ResolutionResolver();
    if (this.resolver) {
      this.resolver.setNext(resolver);
    } else {
      this.resolver = resolver;
    }
    return this;
  }

  build(): ProjectionResolverInterface {
    return this.resolver;
  }
}
