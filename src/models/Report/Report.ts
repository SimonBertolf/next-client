import { WidgetData } from '@/types/Widget/WidgetData';

export interface Report {
  _id: string;
  name: string;
  data: WidgetData[];
}
