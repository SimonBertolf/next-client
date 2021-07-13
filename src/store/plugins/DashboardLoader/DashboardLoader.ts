import { Store, Plugin } from 'vuex';

// TODO: replace any with type of state
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DashboardLoader: Plugin<any> = (store: Store<any>) => {
  store.subscribe((mutation, state) => {
    const { type } = mutation;
    if (type === 'route/ROUTE_CHANGED') {
      const { params } = state.route;
      if (params?.dashboardId) {
        const { dashboardId } = params;
        store.dispatch('Dashboards/loadDashboard', { _id: dashboardId });
      } else if (state.Dashboards.dashboard) {
        store.commit('Dashboards/flushDashboard');
      }
    }
  });
};

export default DashboardLoader;
