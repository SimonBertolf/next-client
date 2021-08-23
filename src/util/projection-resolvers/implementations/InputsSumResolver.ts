import { ProjectionResolverInterface, ProjectionResolverContextInterface } from '../interfaces';

export class InputsSumResolver implements ProjectionResolverInterface {
  private nextResolver: ProjectionResolverInterface | null = null;

  resolve(ctx: ProjectionResolverContextInterface): ProjectionResolverContextInterface {
    const { rows, section } = ctx;

    const { name: sectionName, inputs } = section;

    const inputValues = inputs.map((input) => input.values);

    const sums = inputValues[0]
      .map((_, colIndex) => inputValues.map((row) => row[colIndex]))
      .map((columnValues) => columnValues.reduce((acc, current) => acc + current, 0));

    rows.push({
      _id: `inputs-sum-${sectionName}`,
      type: 'inputsSum',
      displayName: `Total ${section.displayNames.find((name) => name.lang === 'de')?.text || `t('${section.name}')`}`,
      name: `inputs-sum-${sectionName}`,
      className: 'inputs-sum',
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
