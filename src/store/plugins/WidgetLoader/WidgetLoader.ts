import { Store, Plugin } from 'vuex';

// TODO: replace any with type of state
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WidgetLoader: Plugin<any> = (store: Store<any>) => {
  store.subscribe((mutation, state) => {
    const { type } = mutation;
    if (type === 'route/ROUTE_CHANGED') {
      const { params } = state.route;
      if (!params?.reportId && !params?.dashboardId && !params?.layoutId && state.Widgets.widgets.length > 0) {
        store.commit('Widgets/flushWidgetData');
      }
    }
    if (type === 'Layouts/setResponsiveLayout') {
      // console.log('WL: new Layout, load data for layout widgets');
      // TODO: implement
    }
    if (type === 'Layouts/addWidget') {
      // console.log('WL: new widget, load data for new widget');
      // TODO: implement
    }
  });
};

export default WidgetLoader;
