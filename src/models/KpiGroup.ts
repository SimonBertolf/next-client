import { Kpi } from './Kpi';

export interface KpiGroup {
  id: string;
  category: string;
  kpis: Kpi[];
}
