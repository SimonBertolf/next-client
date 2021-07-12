import { ResponsiveWidgetLayoutItems } from '@/types/WidgetLayout';

export interface LayoutMeta {
  readonly _id: string;
  name: string;
}

export interface Layout extends LayoutMeta {
  responsiveLayout: ResponsiveWidgetLayoutItems;
}
