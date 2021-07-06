import { Module, Mutation, VuexModule, Action } from 'vuex-module-decorators';
import { Dashboard } from '@/models';
import { dashboardsMock } from './DashboardsMock';

@Module({ namespaced: true })
export default class Dashboards extends VuexModule {
  public dashboards: Dashboard[] = dashboardsMock;

  public dashboard: Dashboard | null = null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public filters: any[] = [
    {
      key: 'date',
      type: 'daterange',
      values: ['01', '02', '03'],
    },
    {
      key: 'assets',
      type: 'select',
      values: ['01', '02', '03'],
    },
    {
      key: 'regions',
      type: 'select',
      values: ['01', '02', '03'],
    },
    {
      key: 'portfolios',
      type: 'select',
      values: ['01', '02', '03'],
    },
    {
      key: 'clients',
      type: 'select',
      values: ['01', '02', '03'],
    },
    {
      key: 'usages',
      type: 'select',
      values: ['01', '02', '03'],
    },
    {
      key: 'kinds',
      type: 'select',
      values: ['01', '02', '03'],
    },
    {
      key: 'tanants',
      type: 'select',
      values: ['01', '02', '03'],
    },
  ]; // TODO: implement and type

  // public filters = [];

  @Mutation
  setDashboard(dashboard: Dashboard) {
    this.dashboard = dashboard;
  }

  @Mutation
  flushDashboard() {
    this.dashboard = null;
  }

  @Action
  async loadDashboard({ _id }: { _id: string }): Promise<void> {
    // TODO: remove Mock
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const dashboard = dashboardsMock.find((db) => db._id === _id);
        if (dashboard) {
          this.context.commit('setDashboard', dashboard);
          resolve();
        } else {
          const error = new Error('Dashboard not found');
          this.context.commit('Errors/setError', error, { root: true });
          reject(error);
        }
      }, Math.random() * 2000);
    });
  }
}
