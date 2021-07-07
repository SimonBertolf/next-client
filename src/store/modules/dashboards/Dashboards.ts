import { Module, Mutation, VuexModule, Action } from 'vuex-module-decorators';
import { Dashboard } from '@/models';
import { Filter } from '@/types';
import { dashboardsMock, filtersMock } from './DashboardsMock';

@Module({ namespaced: true })
export default class Dashboards extends VuexModule {
  public dashboards: Dashboard[] = dashboardsMock;

  public dashboard: Dashboard | null = null;

  public filters: Filter[] = [];

  @Mutation
  setDashboard(dashboard: Dashboard) {
    this.dashboard = dashboard;
  }

  @Mutation
  flushDashboard() {
    this.dashboard = null;
    this.filters.splice(0, this.filters.length);
  }

  @Mutation
  setFilters(filters: Filter[]) {
    this.filters.splice(0, this.filters.length, ...filters);
  }

  @Mutation
  setFilterSelected({ key, selected }: { key: string; selected: Filter['selected'] }) {
    const index = this.filters.findIndex((filter) => filter.key === key);
    if (index >= 0) {
      this.filters[index].selected = selected;
    } else {
      const error = new Error(`Filter ${key} not found. Could not set selected.`);
      this.context.commit('Errors/setError', error, { root: true });
    }
  }

  @Mutation
  resetFiltersSelected() {
    this.filters.forEach((filter, index) => {
      if (Array.isArray(filter.selected)) {
        this.filters[index].selected = [];
      } else {
        this.filters[index].selected = undefined;
      }
    });
  }

  @Action
  async loadDashboard({ _id }: { _id: string }): Promise<void> {
    // TODO: remove Mock
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const dashboard = dashboardsMock.find((db) => db._id === _id);
        if (dashboard) {
          this.context.commit('setDashboard', { ...dashboard });
          this.context.commit('setFilters', JSON.parse(JSON.stringify(filtersMock)));
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
