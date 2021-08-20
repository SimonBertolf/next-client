import { Resolution, ProjectionInput } from '@/models';
import { TableData } from '@/types';

export interface ProjectionResolverContextInterface {
  rows: TableData[];
  readonly inputs: ProjectionInput[];
  readonly columnDates: Date[];
  readonly resolution: Resolution;
}
