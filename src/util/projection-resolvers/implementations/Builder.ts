import { ProjectionResolverInterface, ProjectionResolverBuilderInterface } from '../interfaces';
import { InputActualsResolver } from './InputActualsResolver';
import { InputResolver } from './InputResolver';
import { ResolutionResolver } from './ResolutionResolver';
import { SectionActualsResolver } from './SectionActualsResolver';

export class ProjectionResolverBuilder implements ProjectionResolverBuilderInterface {
  private resolver: ProjectionResolverInterface;

  addInputResolver(): ProjectionResolverBuilderInterface {
    const resolver = new InputResolver();
    if (this.resolver) {
      this.resolver.setNext(resolver);
    } else {
      this.resolver = resolver;
    }
    return this;
  }

  addResolutionResolver(): ProjectionResolverBuilderInterface {
    const resolver = new ResolutionResolver();
    if (this.resolver) {
      this.resolver.setNext(resolver);
    } else {
      this.resolver = resolver;
    }
    return this;
  }

  addInputActualsResolver(): ProjectionResolverBuilderInterface {
    const resolver = new InputActualsResolver();
    if (this.resolver) {
      this.resolver.setNext(resolver);
    } else {
      this.resolver = resolver;
    }
    return this;
  }

  addSectionActualsResolver(): ProjectionResolverBuilderInterface {
    const resolver = new SectionActualsResolver();
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
