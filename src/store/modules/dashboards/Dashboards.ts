import { Module, Mutation, VuexModule, Action } from 'vuex-module-decorators';
import { Dashboard } from '@/models';
import { Filter, FilterSelection } from '@/types';
import { dashboardsMock, filterSelectionsMock } from './DashboardsMock';

@Module({ namespaced: true })
export default class Dashboards extends VuexModule {
  public dashboards: Dashboard[] = dashboardsMock;

  public dashboard: Dashboard | null = null;

  // stores available filters and options
  public filters: Filter[] = [];

  // stores filter selections
  public filterSelections: FilterSelection[] = [];

  // is watched to relode widget data on filter change
  public updatedFilters: Filter['key'][] = [];

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
  setFilterSelections(filterSelections: FilterSelection[]) {
    this.filterSelections.splice(0, this.filterSelections.length, ...filterSelections);
  }

  @Mutation
  setFilterSelection({ key, selection }: { key: string; selection: FilterSelection }) {
    const index = this.filters.findIndex((filter) => filter.key === key);
    if (index >= 0) {
      this.filterSelections.splice(index, 1, [...selection]);
      // this.filterSelections[index].splice(0, this.filterSelections[index].length, ...selection);
    } else {
      const error = new Error(`Filter ${key} not found. Could not set selection.`);
      this.context.commit('Errors/setError', error, { root: true });
    }
  }

  @Mutation
  setUpdatedFilters({ filterKeys }: { filterKeys: Filter['key'][] }) {
    this.updatedFilters = [...filterKeys];
  }

  @Mutation
  resetFiltersSelections() {
    this.filterSelections.splice(0, this.filterSelections.length, ...[...new Array(this.filters.length)].map(() => []));
  }

  @Action
  async loadDashboard({ _id }: { _id: string }): Promise<void> {
    // TODO: remove Mock
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const dashboard = dashboardsMock.find((db) => db._id === _id);
        if (dashboard) {
          const { filters, layout, ...rest } = dashboard;
          this.context.commit('setDashboard', { ...rest, layout: JSON.parse(JSON.stringify(layout)) });
          if (filters) {
            this.context.commit('setFilters', JSON.parse(JSON.stringify(filters)));
            this.context.commit('setFilterSelections', JSON.parse(JSON.stringify(filterSelectionsMock)));
          }
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
