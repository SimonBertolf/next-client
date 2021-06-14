import { Module, VuexModule } from 'vuex-module-decorators';
import { Dashboard } from '@/types';
import { dashboardsMock } from './DashboardsMock';

@Module({ namespaced: true })
export default class Dashboards extends VuexModule {
  public dashboards: Dashboard[] = dashboardsMock;
}
