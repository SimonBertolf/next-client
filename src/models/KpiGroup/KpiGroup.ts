import { Kpi } from '../Kpi';

interface KpiGroup {
  id: string;
  category: string;
  kpis: Kpi[];
}

export default KpiGroup;
