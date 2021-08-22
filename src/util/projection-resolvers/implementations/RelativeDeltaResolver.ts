import { ProjectionResolverInterface, ProjectionResolverContextInterface } from '../interfaces';

export class RelativeDeltaResolver implements ProjectionResolverInterface {
  private nextResolver: ProjectionResolverInterface | null = null;

  resolve(ctx: ProjectionResolverContextInterface): ProjectionResolverContextInterface {
    const { rows, section, columnDates } = ctx;

    const { name: sectionName } = section;

    const deltaRow = rows.find((row) => row.type === 'deltaAbsolute');
    if (!deltaRow) throw new Error(`Inputs sum row is missing in section ${sectionName}!`);

    const deltaValues = Object.entries(deltaRow)
      .filter(([key]) => !Number.isNaN(Date.parse(key)))
      .sort(([keyA], [keyB]) => {
        const dateA = new Date(keyA);
        const dateB = new Date(keyB);
        if (dateA < dateB) return -1;
        if (dateA > dateB) return 1;
        return 0;
      })
      .map(([, value]) => value as number);

    const actualsSumRow =
      rows.find((row) => row.type === 'sectionActual') || rows.find((row) => row.type === 'actualsSum');
    if (!actualsSumRow) throw new Error(`Both, section actual and actuals sum row is missing ${sectionName}!`);

    const actualsSumValues = Object.entries(actualsSumRow)
      .filter(([key]) => !Number.isNaN(Date.parse(key)))
      .sort(([keyA], [keyB]) => {
        const dateA = new Date(keyA);
        const dateB = new Date(keyB);
        if (dateA < dateB) return -1;
        if (dateA > dateB) return 1;
        return 0;
      })
      .map(([, value]) => value as number);

    const values = [deltaValues, actualsSumValues];

    const deltas = values[0]
      .map((_, colIndex) => values.map((row) => row[colIndex]))
      .map(([deltaValue, actualsSumValue]) => deltaValue / actualsSumValue);

    const deltaEntriesT = [columnDates.map((colDate) => colDate.toISOString()), deltas];
    const deltaEntries = deltaEntriesT[0].map((_, colIndex) => deltaEntriesT.map((row) => row[colIndex]));
    const deltasObject: { [key: string]: number } = Object.fromEntries(deltaEntries);

    rows.push({
      _id: `delta-relative-${sectionName}`,
      type: 'deltaRelative',
      displayName: `Abweichung %`,
      name: `delta-relative-${sectionName}`,
      className: 'delta-relative',
      ...deltasObject,
      values: [], // TODO: calculate values for each month if needed
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
