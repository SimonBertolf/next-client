import { Resolution, ProjectionActual, ProjectionSection } from '@/models';
import { ProjectionTableRow } from '@/types';

export interface ProjectionResolverContextInterface {
  rows: ProjectionTableRow[];
  readonly section: ProjectionSection;
  readonly actuals: ProjectionActual[];
  readonly columnDates: Date[];
  readonly resolution: Resolution;
}
