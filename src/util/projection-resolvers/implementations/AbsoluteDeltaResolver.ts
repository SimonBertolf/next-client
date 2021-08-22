import { ProjectionResolverInterface, ProjectionResolverContextInterface } from '../interfaces';

export class AbsoluteDeltaResolver implements ProjectionResolverInterface {
  private nextResolver: ProjectionResolverInterface | null = null;

  resolve(ctx: ProjectionResolverContextInterface): ProjectionResolverContextInterface {
    const { rows, section } = ctx;

    const { name: sectionName } = section;

    const inputsSumRow = rows.find((row) => row.type === 'inputsSum');
    if (!inputsSumRow) throw new Error(`Inputs sum row is missing in section ${sectionName}!`);

    const actualsSumRow =
      rows.find((row) => row.type === 'sectionActual') || rows.find((row) => row.type === 'actualsSum');
    if (!actualsSumRow) throw new Error(`Both, section actual and actuals sum row is missing ${sectionName}!`);

    const deltaValues = [inputsSumRow.values, actualsSumRow.values.map((value) => -value)];

    const deltas = deltaValues[0]
      .map((_, colIndex) => deltaValues.map((row) => row[colIndex]))
      .map((columnValues) => columnValues.reduce((acc, current) => acc + current, 0));

    rows.push({
      _id: `delta-absolute-${sectionName}`,
      type: 'deltaAbsolute',
      displayName: `Abweichung`,
      name: `delta-absolute-${sectionName}`,
      className: 'delta-absolute',
      values: deltas,
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
