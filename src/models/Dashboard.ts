import { Filter } from '@/types';
import { ApiLayout } from './Layout';

export interface Dashboard {
  readonly _id: string;
  name: string;
  layout: ApiLayout;
  filters?: Filter[];
}
