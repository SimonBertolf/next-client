import { ProjectionResolverInterface, ProjectionResolverBuilderInterface } from '../interfaces';
import { HorizontalSumResolver } from './HorizontalSumResolver';
import { InputActualsResolver } from './InputActualsResolver';
import { InputResolver } from './InputResolver';
import { ResolutionResolver } from './ResolutionResolver';
import { SectionActualsResolver } from './SectionActualsResolver';

export class ProjectionResolverBuilder implements ProjectionResolverBuilderInterface {
  private resolver: ProjectionResolverInterface;

  private addResolver(resolver: ProjectionResolverInterface): void {
    if (this.resolver) {
      this.resolver.setNext(resolver);
    } else {
      this.resolver = resolver;
    }
  }

  addInputResolver(): ProjectionResolverBuilderInterface {
    const resolver = new InputResolver();
    this.addResolver(resolver);
    return this;
  }

  addResolutionResolver(): ProjectionResolverBuilderInterface {
    const resolver = new ResolutionResolver();
    this.addResolver(resolver);
    return this;
  }

  addInputActualsResolver(): ProjectionResolverBuilderInterface {
    const resolver = new InputActualsResolver();
    this.addResolver(resolver);
    return this;
  }

  addSectionActualsResolver(): ProjectionResolverBuilderInterface {
    const resolver = new SectionActualsResolver();
    this.addResolver(resolver);
    return this;
  }

  addHorizintalSumResolver(): ProjectionResolverBuilderInterface {
    const resolver = new HorizontalSumResolver();
    this.addResolver(resolver);
    return this;
  }

  build(): ProjectionResolverInterface {
    return this.resolver;
  }
}
