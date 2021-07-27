import { Report, Dashboard } from '@/models';
import { ResponsiveWidgetLayoutItems } from '@/types';
import { Store, Plugin } from 'vuex';
import { Route } from 'vue-router';

// TODO: replace any with type of state
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LayoutLoader: Plugin<any> = (store: Store<any>) => {
  store.subscribe((mutation, state) => {
    const { type } = mutation;
    if (type === 'route/ROUTE_CHANGED') {
      const { params, path } = state.route as Route;
      if (params?.layoutId) {
        const { layoutId } = params;
        store.commit('Layouts/setHost', { host: 'editor' });
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
        store.commit('Layouts/setHost', { host: null });
        store.dispatch('Layouts/flushLayout');
      }

      if (path?.includes('/layouts') && !params.layoutId) {
        store.dispatch('Layouts/loadLayouts', {});
      } else if (state.Layouts.layouts.length) {
        store.dispatch('Layouts/flushLayouts');
      }
    }

    if (type === 'Reports/setReport') {
      const { report }: { report: Report } = state.Reports;
      if (report) {
        const { layout } = report;
        if (layout) {
          store.commit('Layouts/setHost', { host: 'report' });
          store.dispatch('Layouts/setLayout', layout);
        }
      }
    }

    if (type === 'Dashboards/setDashboard') {
      const { dashboard }: { dashboard: Dashboard } = state.Dashboards;
      if (dashboard) {
        const { layout } = dashboard;
        if (layout) {
          store.commit('Layouts/setHost', { host: 'dashboard' });
          store.dispatch('Layouts/setLayout', layout);
        }
      }
    }
  });
};

export default LayoutLoader;
