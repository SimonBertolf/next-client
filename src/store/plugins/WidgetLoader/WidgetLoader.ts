import { Store, Plugin } from 'vuex';

// TODO: replace any with type of state
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WidgetLoader: Plugin<any> = (store: Store<any>) => {
  store.subscribe((mutation, state) => {
    const { type, payload } = mutation;

    if (type === 'route/ROUTE_CHANGED') {
      const { params } = state.route;
      if (
        (!params?.reportId && !params?.dashboardId && !params?.layoutId && state.Widgets.widgets.length) ||
        (payload?.to?.params?.dashboardId && payload.to.params.dashboardId !== payload.from?.params?.dashboardId) ||
        (payload?.to?.params?.reportId && payload.to.params.reportId !== payload.from?.params?.reportId) ||
        (payload?.to?.params?.layoutId && payload.to.params.layoutId !== payload.from?.params?.layoutId)
      ) {
        store.dispatch('Widgets/flushWidgetData');
      }
    }
  });
};

export default WidgetLoader;
