import { Filter } from '@/types';
import { Layout } from '../Layout';

export interface Dashboard {
  readonly _id: string;
  name: string;
  layout: Layout;
  filters?: Filter[];
}
