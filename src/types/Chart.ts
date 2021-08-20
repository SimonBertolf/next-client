export interface ChartData {
  [key: string]: number | string;
}

export interface XYChartSeries {
  x: { key: string };
  y: { key: string };
  z: { key: string; showValue: boolean; valueFillColor?: string; valueTextColor?: string; unit?: string };
}

export interface LineChartSeries {
  x: { key: string };
  y: { key: string };
  showStroke: boolean;
  showBullet: boolean;
  strokeColor?: string;
  bulletFillCollor?: string;
}

export interface XYChartAxes {
  x: { label: string; unit?: string };
  y: { label: string; unit?: string };
  z: { label: string; unit?: string };
}

export interface LineChartAxes {
  x: { label: string; unit?: string };
  y: { label: string; unit?: string };
}
