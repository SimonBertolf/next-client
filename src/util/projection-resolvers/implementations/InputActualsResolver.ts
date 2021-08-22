import { ProjectionResolverInterface, ProjectionResolverContextInterface } from '../interfaces';

export class InputActualsResolver implements ProjectionResolverInterface {
  private nextResolver: ProjectionResolverInterface | null = null;

  resolve(ctx: ProjectionResolverContextInterface): ProjectionResolverContextInterface {
    const { section, rows, actuals } = ctx;

    const { inputs, name: sectionName } = section;

    inputs.forEach((input) => {
      const { actual: actualRef } = input;
      if (actualRef) {
        const actual = actuals.find((item) => item.name === actualRef && item.section === sectionName);
        if (!actual) throw new Error(`Missing input actual with name ${actualRef}`);
        const inputRowIndex = rows.findIndex((row) => row.name === input.name && row.type === 'input');
        if (inputRowIndex === -1) throw new Error(`Row for input ${input.name} is missing!`);
        rows.splice(inputRowIndex + 1, 0, {
          _id: `input-actual-${sectionName}-${actual.name}`,
          type: 'inputActual',
          displayName: actual.displayNames.find((name) => name.lang === 'de')?.text || `t('${actual.name}')`,
          name: actual.name,
          values: actual.values,
        });
      }
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
