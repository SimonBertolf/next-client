interface FilterBase {
  key: string;
  type: 'Select' | 'DateRange';
}

export interface SelectFilter extends FilterBase {
  selected: string[];
  available: string[];
  type: 'Select';
}

export interface DateRangeFilter extends FilterBase {
  selected?: { from: Date; to: Date };
  available: { from: Date; to: Date };
  type: 'DateRange';
}

export type Filter = SelectFilter | DateRangeFilter;
