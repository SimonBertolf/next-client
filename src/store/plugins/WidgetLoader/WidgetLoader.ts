import { Filter } from '@/types';
import { Store, Plugin } from 'vuex';

// TODO: replace any with type of state
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WidgetLoader: Plugin<any> = (store: Store<any>) => {
  store.subscribe((mutation, state) => {
    const { type, payload } = mutation;

    if (type === 'route/ROUTE_CHANGED') {
      const { params } = state.route;
      if (!params?.reportId && !params?.dashboardId && !params?.layoutId && state.Widgets.widgets.length > 0) {
        store.commit('Widgets/flushWidgetData');
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

export default WidgetLoader;
