import { ProjectionTableRow } from '@/types';
import { ProjectionResolverInterface, ProjectionResolverContextInterface } from '../interfaces';

export class InputResolver implements ProjectionResolverInterface {
  private nextResolver: ProjectionResolverInterface | null = null;

  resolve(ctx: ProjectionResolverContextInterface): ProjectionResolverContextInterface {
    const { section, rows } = ctx;

    const { inputs } = section;

    const newRows: ProjectionTableRow[] = [...new Array(inputs.length)].map(
      (item, index): ProjectionTableRow => ({
        _id: inputs[index]._id,
        type: 'input',
        displayName:
          inputs[index].displayNames.find((name) => name.lang === 'de')?.text || `t('${inputs[index].name}')`,
        name: inputs[index].name,
        className: `input-${inputs[index].name}`,
        values: inputs[index].values,
      }),
    );

    const newCtx = { ...ctx, rows: [...rows, ...newRows] };

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
