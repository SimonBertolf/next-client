import { WidgetData } from '@/types';
import { OrganisationDocument } from './Document';
import { ApiLayout } from './Layout';

export interface Report extends OrganisationDocument {
  readonly _id: string;
  name: string;
  description?: string;
  layout: ApiLayout | string;
  data: WidgetData[];
}
