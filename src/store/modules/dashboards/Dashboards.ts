import { Module, Mutation, VuexModule, Action } from 'vuex-module-decorators';
import type { Dashboard } from '@/models';
import type { DateRangeFilter, Filter, FilterSelection, QueryInterface, SelectFilter } from '@/types';
import type { IRepository } from '@/services';
import { Inject } from 'inversify-props';

@Module({ namespaced: true })
export default class Dashboards extends VuexModule {
  public dashboards: Dashboard[] = [];

  public dashboard: Dashboard | null = null;

  // stores available filters and options
  public filters: Filter[] = [];

  // stores filter selections
  public filterSelections: FilterSelection[] = [];

  // is watched to reload widget data on filter change
  public updatedFilters: Filter['key'][] = [];

  public loading = {
    dashboards: false,
    dashboard: false,
  };

  @Inject('DashboardRepository')
  private dashboardRepository: IRepository<Dashboard>;

  @Mutation
  setLoading({ key, loading }: { key: 'dashboards' | 'dashboard'; loading: boolean }): void {
    this.loading[key] = loading;
  }

  @Mutation
  setDashboard(dashboard: Dashboard): void {
    this.dashboard = dashboard;
  }

  @Mutation
  setFilters(filters: Filter[]): void {
    this.filters.splice(0, this.filters.length, ...filters);
  }

  @Mutation
  setFilterSelections(filterSelections: FilterSelection[]): void {
    this.filterSelections.splice(0, this.filterSelections.length, ...filterSelections);
  }

  @Mutation
  setFilterSelection({ key, selection }: { key: string; selection: FilterSelection }): void {
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
  setUpdatedFilters({ filterKeys }: { filterKeys: Filter['key'][] }): void {
    this.updatedFilters = [...filterKeys];
  }

  @Mutation
  resetFiltersSelections(): void {
    this.filterSelections.splice(0, this.filterSelections.length, ...[...new Array(this.filters.length)].map(() => []));
  }

  @Mutation
  setDashboards(dashboards: Dashboard[]): void {
    this.dashboards = dashboards;
  }

  @Action
  async loadDashboard({ _id }: { _id: string }): Promise<void> {
    try {
      this.context.commit('setLoading', { key: 'dashboard', loading: true });
      const dashboard = await this.dashboardRepository.getById(_id);
      const { filters, ...rest } = dashboard;
      this.context.commit('setDashboard', rest);
      // TODO: replace filters option mock with data from legacy backend, when legacy endpoints implemented
      this.context.commit(
        'setFilters',
        filters.map(
          (item): Filter =>
            item.type === 'DateRange'
              ? ({
                  ...item,
                  options: { from: new Date('2012-01-06T13:21:33+000Z'), to: new Date('2021-07-06T13:21:33+000Z') },
                } as DateRangeFilter)
              : ({
                  ...item,
                  options: ['01', '02', '03'],
                } as SelectFilter),
        ),
      );
      // TODO: set filterSelections from legacy backend data
      const mockFilterSelections: FilterSelection[] = [...new Array(this.filters.length)].map(() => []);
      this.context.commit('setFilterSelections', mockFilterSelections);
      this.context.commit('setLoading', { key: 'dashboard', loading: false });
    } catch (error) {
      this.context.commit('Errors/setError', error, { root: true });
    }
  }

  @Action
  async updateDashboard({ _id, ...dashboardUpdates }: Partial<Dashboard> & { _id: string }): Promise<void> {
    try {
      this.context.commit('setLoading', { key: 'dashboards', loading: true });
      await this.dashboardRepository.update({ ...dashboardUpdates, _id });
      await this.context.dispatch('loadDashboards', { sort: { pos: 1 } });
    } catch (error) {
      this.context.commit('Errors/setError', error, { root: true });
    }
  }

  @Action
  flushDashboard(): void {
    this.context.commit('setDashboard', null);
    this.context.commit('setFilters', new Array<Filter>());
  }

  @Action
  async loadDashboards(query?: QueryInterface): Promise<void> {
    try {
      this.context.commit('setLoading', { key: 'dashboards', loading: true });
      const dashboards = await this.dashboardRepository.list(query);
      this.context.commit('setDashboards', dashboards);
      this.context.commit('setLoading', { key: 'dashboards', loading: false });
    } catch (error) {
      this.context.commit('Errors/setError', error, { root: true });
    }
  }

  @Action
  flushDashboards(): void {
    this.context.commit('setDashboards', new Array<Dashboard>());
  }
}
