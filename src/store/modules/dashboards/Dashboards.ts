import { Module, VuexModule } from 'vuex-module-decorators';
import { Dashboard } from '@/models';
import { dashboardsMock } from './DashboardsMock';

@Module({ namespaced: true })
export default class Dashboards extends VuexModule {
  public dashboards: Dashboard[] = dashboardsMock;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public filters: any[] = []; // TODO: implement and type
}
