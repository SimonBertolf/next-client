import { GridItemData } from 'vue-grid-layout';

export type WidgetType = 'WidgetA' | 'WidgetB' | 'WidgetC';

export interface WidgetItem extends GridItemData {
  type: WidgetType;
}

export type WidgetItems = WidgetItem[];

export interface ResponsiveWidgetItems {
  lg?: WidgetItems;
  md?: WidgetItems;
  sm?: WidgetItems;
  xs?: WidgetItems;
  xxs?: WidgetItems;
}
