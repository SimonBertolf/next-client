import { Filter } from '@/types';
import { Route } from 'vue-router';
import { Store, Plugin } from 'vuex';

// TODO: replace any with type of state
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DashboardLoader: Plugin<any> = (store: Store<any>) => {
  store.subscribe((mutation, state) => {
    const { type, payload } = mutation;
    if (type === 'route/ROUTE_CHANGED') {
      const { params, path } = state.route as Route;
      const { from, to } = payload;
      if (params?.dashboardId) {
        const { dashboardId } = params;
        store.dispatch('Dashboards/loadDashboard', { _id: dashboardId });
      } else if (state.Dashboards.dashboard) {
        store.dispatch('Dashboards/flushDashboard');
      }

      if (path?.includes('/admin/dashboards')) {
        store.dispatch('Dashboards/loadDashboards', { sort: { pos: 1 } });
      } else if (path?.includes('/dashboards')) {
        // only fire if dashboards not loaded yet. Not if change from one dashboard to other.
        if (!(from?.params?.dashboardId && to?.params?.dashboardId)) {
          store.dispatch('Dashboards/loadDashboards', { sort: { pos: 1 }, filter: { enabled: true } });
        }
      } else if (state.Dashboards.dashboards.length) {
        store.dispatch('Dashboards/flushDashboards');
      }
    }

    if (type === 'Dashboards/resetFiltersSelections' || type === 'Dashboards/setFilterSelections') {
      // mutations of all filters trigger reload of all widgets
      const { filters }: { filters: Filter[] } = state.Dashboards;
      const filterKeys = filters.map((item: Filter) => item.key);
      store.commit('Dashboards/setUpdatedFilters', { filterKeys });
    }

    if (type === 'Dashboards/setFilterSelection') {
      // mutations of one filter triggers reload of widgets with dependency to that filter.
      store.commit('Dashboards/setUpdatedFilters', { filterKeys: [payload.key] });
    }
  });
};

export default DashboardLoader;
