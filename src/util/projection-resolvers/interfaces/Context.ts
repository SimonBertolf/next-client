import { Resolution } from '@/models';
import { ProjectionDataColumn, TableData } from '@/types';

export interface ProjectionResolverContext {
  rows: TableData[];
  readonly columns: ProjectionDataColumn[];
  readonly resulution: Resolution;
}
