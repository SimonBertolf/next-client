import { ProjectionTableRow } from '@/types';
import { ProjectionResolverInterface, ProjectionResolverContextInterface } from '../interfaces';

export class ResolutionResolver implements ProjectionResolverInterface {
  private nextResolver: ProjectionResolverInterface | null = null;

  resolve(ctx: ProjectionResolverContextInterface): ProjectionResolverContextInterface {
    const { resolution, columnDates, rows } = ctx;

    const firstClusterDate = new Date(columnDates[0]);

    const newRows: ProjectionTableRow[] = rows.map((row) => {
      const { values } = row;
      const clusters = values.reduce(
        (acc: { value: number; date: Date }[], currentValue: number, currentIndex) => {
          // get clusterValue and clusterDate
          const { value: clusterValue, date: clusterDate } = acc[acc.length - 1];

          // calculate current date
          const currentDate = new Date(firstClusterDate);
          currentDate.setMonth(currentDate.getMonth() + currentIndex);

          // calculate quarters
          const currentQuarter = Math.ceil((currentDate.getMonth() + 1) / 3);
          const clusterQuarter = Math.ceil((clusterDate.getMonth() + 1) / 3);

          // check if currentDate is in current cluster
          if (
            ((resolution === 'monthly' && currentDate.getMonth() === clusterDate.getMonth()) ||
              (resolution === 'quarterly' && currentQuarter === clusterQuarter) ||
              resolution === 'yearly') &&
            currentDate.getFullYear() === clusterDate.getFullYear()
          ) {
            // add current value to value of currentCluster
            acc[acc.length - 1] = { date: clusterDate, value: clusterValue + currentValue };
          } else {
            // create new cluster and add current value to new cluster
            acc.push({ date: new Date(currentDate), value: currentValue });
          }

          return acc;
        },
        [{ value: 0, date: firstClusterDate }],
      );

      const inputValues = Object.fromEntries(
        clusters.map((cluster, clusterIndex) => [columnDates[clusterIndex].toISOString(), cluster.value]),
      );
      return { ...row, ...inputValues };
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
