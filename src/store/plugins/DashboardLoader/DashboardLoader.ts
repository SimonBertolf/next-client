import { Route } from 'vue-router';
import { Store, Plugin } from 'vuex';

// TODO: replace any with type of state
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DashboardLoader: Plugin<any> = (store: Store<any>) => {
  store.subscribe((mutation, state) => {
    const { type } = mutation;
    if (type === 'route/ROUTE_CHANGED') {
      const { params, path } = state.route as Route;
      if (params?.dashboardId) {
        const { dashboardId } = params;
        store.dispatch('Dashboards/loadDashboard', { _id: dashboardId });
      } else if (state.Dashboards.dashboard) {
        store.dispatch('Dashboards/flushDashboard');
      }

      if (path?.includes('/dashboards')) {
        // only fire if dashboards not loaded yet. Not if change from one dashboard to other.
        if (!state.Dashboards.dashboards.length) {
          store.dispatch('Dashboards/loadDashboards', { sort: { pos: 1 } });
        }
      } else if (state.Dashboards.dashboards.length) {
        store.dispatch('Dashboards/flushDashboards');
      }
    }
  });
};

export default DashboardLoader;
