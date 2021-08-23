export interface ChartData {
  [key: string]: number | string;
}

interface XYChartSeries {
  x: { key: string };
  y: { key: string };
  color?: string;
}

export interface LineChartSeries extends XYChartSeries {
  showStroke?: boolean; // default true
  showBullet?: boolean; // default flse
}

export interface BubbelChartSeries extends XYChartSeries {
  z: { key: string; showValue?: boolean; unit?: string };
  valueColor?: string;
}

export interface XYChartAxes {
  x: { label: string; unit?: string };
  y: { label: string; unit?: string };
}
