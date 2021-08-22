import { ProjectionResolverInterface, ProjectionResolverContextInterface } from '../interfaces';

export class ActualsSumResolver implements ProjectionResolverInterface {
  private nextResolver: ProjectionResolverInterface | null = null;

  resolve(ctx: ProjectionResolverContextInterface): ProjectionResolverContextInterface {
    const { rows, section } = ctx;

    const { name: sectionName } = section;

    const actualValues = rows.filter((row) => row.type === 'inputActual').map((row) => row.values);

    const sums = actualValues[0]
      .map((_, colIndex) => actualValues.map((row) => row[colIndex]))
      .map((columnValues) => columnValues.reduce((acc, current) => acc + current, 0));

    rows.push({
      _id: `actuals-sum-${sectionName}`,
      type: 'actualsSum',
      displayName: `Effektiv ${
        section.displayNames.find((name) => name.lang === 'de')?.text || `t('${section.name}')`
      }`,
      name: `actuals-sum-${sectionName}`,
      className: 'actuals-sum',
      values: sums,
    });

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
