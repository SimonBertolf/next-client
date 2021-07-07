import { Module, Mutation, VuexModule, Action } from 'vuex-module-decorators';
import { Dashboard } from '@/models';
import { Filter } from '@/types';
import { dashboardsMock } from './DashboardsMock';

@Module({ namespaced: true })
export default class Dashboards extends VuexModule {
  public dashboards: Dashboard[] = dashboardsMock;

  public dashboard: Dashboard | null = null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public filters: Filter[] = [
    {
      key: 'date',
      type: 'DateRange',
      available: { from: new Date('2012-01-06T13:21:33+0000'), to: new Date('2021-07-06T13:21:33+0000') },
      selected: { from: new Date('2021-01-06T13:21:33+0000'), to: new Date('2021-07-06T13:21:33+0000') },
    },
    {
      key: 'clients',
      type: 'Select',
      available: ['01', '02', '03'],
      selected: [],
    },
    {
      key: 'portfolios',
      type: 'Select',
      available: ['01', '02', '03'],
      selected: ['01', '03'],
    },
    {
      key: 'regions',
      type: 'Select',
      available: ['01', '02', '03'],
      selected: [],
    },
    {
      key: 'assets',
      type: 'Select',
      available: ['01', '02', '03'],
      selected: [],
    },
    {
      key: 'usages',
      type: 'Select',
      available: ['01', '02', '03'],
      selected: [],
    },
    {
      key: 'kinds',
      type: 'Select',
      available: ['01', '02', '03'],
      selected: [],
    },
    {
      key: 'tanants',
      type: 'Select',
      available: ['01', '02', '03'],
      selected: [],
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
