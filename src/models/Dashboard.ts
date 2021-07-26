import { FilterBase, Translation } from '@/types';
import { OrganisationDocument } from './Document';
import { ApiLayout } from './Layout';

export interface Dashboard extends OrganisationDocument {
  name: string;
  displayNames: Translation[];
  description?: string;
  layout: ApiLayout;
  filters: FilterBase[];
  pos: number;
  enabled: boolean;
}
