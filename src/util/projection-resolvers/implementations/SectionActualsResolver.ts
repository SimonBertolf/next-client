import { ProjectionResolverInterface, ProjectionResolverContextInterface } from '../interfaces';

export class SectionActualsResolver implements ProjectionResolverInterface {
  private nextResolver: ProjectionResolverInterface | null = null;

  resolve(ctx: ProjectionResolverContextInterface): ProjectionResolverContextInterface {
    const { section, rows, actuals } = ctx;
    const { actual: actualRef, name: sectionName } = section;

    if (actualRef) {
      const actual = actuals.find((item) => item.name === actualRef && item.section === sectionName);
      if (!actual) throw new Error(`Missing section actual with name ${actualRef}`);
      rows.push({
        _id: `section-actual-${sectionName}-${actual.name}`,
        type: 'sectionActual',
        displayName: actual.displayNames.find((name) => name.lang === 'de')?.text || `t('${actual.name}')`,
        name: actual.name,
        values: actual.values,
      });
    }

    const newCtx = { ...ctx, rows };

    if (this.nextResolver) return this.nextResolver.resolve(newCtx);
    return newCtx;
  }

  setNext(resolver: ProjectionResolverInterface): void {
    if (this.nextResolver) {
      this.nextResolver.setNext(resolver);
    } else {
      this.nextResolver = resolver;
    }
  }
}
