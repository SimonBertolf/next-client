import { TableData } from './TableTypes';

export interface ProjectionDataColumn {
  name: string;
  key: string;
}

type ProjectionRowType = 'input' | 'sectionActual' | 'inputActual' | 'inputSum' | 'percentage';

export interface ProjectionTableRow extends Pick<TableData, '_id'> {
  [key: string]: string | number | number[];
  values: number[];
  type: ProjectionRowType;
  name: string;
  className: string;
  displayName: string;
}
