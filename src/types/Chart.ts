export interface ChartData {
  [key: string]: number | string;
}

export interface LineChartSeries {
  x: { key: string; color?: string };
  y: { key: string; color?: string };
}
export interface LineChartAxes {
  x: { label: string; unit?: string };
  y: { label: string; unit?: string };
}

export interface XYChartSeries {
  x: { key: string };
  y: { key: string };
  z: { key: string; showValue: boolean; valueFillColor?: string; valueTextColor?: string; unit?: string };
}

export interface XYChartAxes {
  x: { label: string; unit?: string };
  y: { label: string; unit?: string };
  z: { label: string; unit?: string };
}
