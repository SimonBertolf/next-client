import { GridItemData } from 'vue-grid-layout';

export type WidgetType = 'WidgetA' | 'WidgetB' | 'WidgetC';

export interface WidgetData {
  type: WidgetType;
  _id: string;
}

export interface WidgetItem extends GridItemData, WidgetData {}

export type WidgetItems = WidgetItem[];

export interface ResponsiveWidgetItems {
  [breakpoint: string]: WidgetItems;
}
