interface Kpi {
  readonly id: string;
  label: string;
  value: number;
  format: string;
  trend: number;
}

export default Kpi;
