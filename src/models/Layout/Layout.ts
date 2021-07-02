import { ResponsiveWidgetLayoutItems } from '@/types/WidgetLayout';

export interface Layout {
  _id: string;
  name: string;
  responsiveLayout: ResponsiveWidgetLayoutItems;
}
