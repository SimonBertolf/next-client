import { GridBreakpoint } from 'vue-grid-layout';
import { WidgetType } from './WidgetType';

export interface Coordinates {
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
