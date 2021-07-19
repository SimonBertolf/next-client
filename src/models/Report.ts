import { WidgetData } from '@/types/Widget/WidgetData';
import { ApiLayout } from './Layout';

export interface Report {
  readonly _id: string;
  name: string;
  layout: ApiLayout;
  data: WidgetData[];
}
