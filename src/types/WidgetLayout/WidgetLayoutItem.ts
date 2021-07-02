import { GridItemData } from 'vue-grid-layout';
import { Widget } from '../Widget';

export interface WidgetLayoutItem extends GridItemData, Widget {}

export type WidgetLayoutItems = WidgetLayoutItem[];

export interface ResponsiveWidgetLayoutItems {
  [breakpoint: string]: WidgetLayoutItems;
}
