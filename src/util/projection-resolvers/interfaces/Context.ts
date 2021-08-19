import { Resolution, ProjectionInput } from '@/models';
import { TableData } from '@/types';

export interface ProjectionResolverContext {
  rows: TableData[];
  readonly inputs: ProjectionInput[];
  readonly columnDates: Date[];
  readonly resolution: Resolution;
}
