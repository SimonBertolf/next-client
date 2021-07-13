import { Report, Dashboard } from '@/models';
import { ResponsiveWidgetLayoutItems } from '@/types';
import { Store, Plugin } from 'vuex';

// TODO: replace any with type of state
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LayoutLoader: Plugin<any> = (store: Store<any>) => {
  store.subscribe((mutation, state) => {
    const { type } = mutation;
    if (type === 'route/ROUTE_CHANGED') {
      const { params } = state.route;
      if (params?.layoutId) {
        const { layoutId } = params;
        store.dispatch('Layouts/loadLayout', { _id: layoutId });
      } else if (
        (Object.entries(state.Layouts.responsiveLayout as ResponsiveWidgetLayoutItems).reduce(
          (acc, cur) => acc || cur[1].length > 0,
          false,
        ) ||
          state.Layouts.layoutMeta) &&
        !params?.reportId &&
        !params?.dashboardId
      ) {
        store.commit('Layouts/flushLayout');
      }
    }
    if (type === 'Reports/setReport') {
      const { report }: { report: Report } = state.Reports;
      if (report) {
        const { layout } = report;
        if (layout?.responsiveLayout) {
          store.commit('Layouts/setResponsiveLayout', { ...layout.responsiveLayout });
        }
      }
    }
    if (type === 'Dashboards/setDashboard') {
      const { dashboard }: { dashboard: Dashboard } = state.Dashboards;
      if (dashboard) {
        const { layout } = dashboard;
        if (layout?.responsiveLayout) {
          store.commit('Layouts/setResponsiveLayout', { ...layout.responsiveLayout });
        }
      }
    }
  });
};

export default LayoutLoader;
