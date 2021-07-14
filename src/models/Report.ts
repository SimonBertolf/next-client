import { WidgetData } from '@/types/Widget/WidgetData';
import { Layout } from './Layout';

export interface Report {
  readonly _id: string;
  name: string;
  layout: Layout;
  data: WidgetData[];
}
