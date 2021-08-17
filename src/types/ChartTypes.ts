// TODO: extend if needed
export interface LineChartSeries {
  x: { key: string };
  y: { key: string };
  color?: string;
}

export interface XYChartSeries extends LineChartSeries {
  z: { key: string };
}

// TODO: extend if needed
export interface LineChartAxes {
  x: { label: string };
  y: { label: string };
}

export interface XYChartAxes {
  x: { label: string };
  y: { label: string };
}

export interface ChartData {
  [key: string]: number | string;
}
