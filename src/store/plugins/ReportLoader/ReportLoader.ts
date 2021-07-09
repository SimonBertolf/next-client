import { Store, Plugin } from 'vuex';

// TODO: replace any with type of state
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ReportLoader: Plugin<any> = (store: Store<any>) => {
  store.subscribe((mutation, state) => {
    const { type } = mutation;
    if (type === 'route/ROUTE_CHANGED') {
      const { params } = state.route;
      if (params?.reportId) {
        const { reportId } = params;
        store.dispatch('Reports/loadReport', { _id: reportId });
      } else {
        store.commit('Reports/flushReport');
      }
    }
  });
};

export default ReportLoader;
