import { GridBreakpoint } from 'vue-grid-layout';
import { WidgetType } from './WidgetType';

export interface Coordinates {
  readonly _id?: string;
  breakpoint: GridBreakpoint;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface WidgetAppearance {
  readonly _id: string;
  type: WidgetType;
  responsiveCoordinates: Coordinates[];
}
