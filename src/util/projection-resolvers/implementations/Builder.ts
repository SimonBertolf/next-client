import { ProjectionResolverInterface, ProjectionResolverBuilderInterface } from '../interfaces';
import { ActualsSumResolver } from './ActualsSumResolver';
import { HorizontalSumResolver } from './HorizontalSumResolver';
import { InputActualsResolver } from './InputActualsResolver';
import { InputsResolver } from './InputsResolver';
import { InputsSumResolver } from './InputsSumResolver';
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

  addInputsResolver(): ProjectionResolverBuilderInterface {
    const resolver = new InputsResolver();
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

  addInputsSumResolver(): ProjectionResolverBuilderInterface {
    const resolver = new InputsSumResolver();
    this.addResolver(resolver);
    return this;
  }

  addActualsSumResolver(): ProjectionResolverBuilderInterface {
    const resolver = new ActualsSumResolver();
    this.addResolver(resolver);
    return this;
  }

  build(): ProjectionResolverInterface {
    return this.resolver;
  }
}
