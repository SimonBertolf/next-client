export interface FilterBase {
  readonly _id?: string;
  key: string;
  type: 'Select' | 'DateRange';
}

export interface SelectFilter extends FilterBase {
  options: string[];
  type: 'Select';
}

export interface DateRangeFilter extends FilterBase {
  options: { from: Date; to: Date };
  type: 'DateRange';
}

export type FilterSelection = string[];

export type Filter = SelectFilter | DateRangeFilter;
