import { ProjectionResolverInterface, ProjectionResolverContextInterface } from '../interfaces';

export class HorizontalSumResolver implements ProjectionResolverInterface {
  private nextResolver: ProjectionResolverInterface | null = null;

  resolve(ctx: ProjectionResolverContextInterface): ProjectionResolverContextInterface {
    const { rows } = ctx;

    const newRows = rows.map((row) => {
      const { type } = row;
      if (type === 'input' || type === 'inputActual' || type === 'sectionActual' || type === 'inputSum') {
        const sum = row.values.reduce((acc, current) => acc + current, 0);
        return { ...row, sum };
      }
      return { ...row };
    });

    const newCtx = { ...ctx, rows: newRows };

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
