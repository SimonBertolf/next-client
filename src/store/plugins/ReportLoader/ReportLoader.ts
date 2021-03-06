import { Store, Plugin } from 'vuex';

// TODO: replace any with type of state
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ReportLoader: Plugin<any> = (store: Store<any>) => {
  store.subscribe((mutation, state) => {
    const { type } = mutation;
    if (type === 'route/ROUTE_CHANGED') {
      const { params, path } = state.route;
      if (params?.reportId) {
        const { reportId } = params;
        store.dispatch('Reports/loadReport', { _id: reportId });
      } else if (state.Reports.report) {
        store.dispatch('Reports/flushReport');
      }

      if (path?.includes('/reports') && !params.reportId) {
        store.dispatch('Reports/loadReports', { sort: { createdAt: -1 } });
      } else if (state.Reports.reports.length) {
        store.dispatch('Reports/flushReports');
      }
    }
  });
};

export default ReportLoader;
