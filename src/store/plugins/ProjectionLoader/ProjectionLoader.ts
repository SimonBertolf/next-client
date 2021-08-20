import { Store, Plugin } from 'vuex';

// TODO: replace any with type of state
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProjectionLoader: Plugin<any> = (store: Store<any>) => {
  store.subscribe((mutation, state) => {
    const { type } = mutation;
    if (type === 'route/ROUTE_CHANGED') {
      const { params } = state.route;
      if (params?.projectionId) {
        const { projectionId } = params;
        store.dispatch('Projections/loadProjection', { _id: projectionId });
      } else if (state.Projections.projectionMeta) {
        store.dispatch('Projections/flushProjection');
      }

      // if (path?.includes('/projections') && !params.projectionId) {
      //   store.dispatch('Projections/loadProjections', { sort: { createdAt: -1 } });
      // } else if (state.Projections.projections.length) {
      //   store.dispatch('Projections/flushProjections');
      // }
    }
  });
};

export default ProjectionLoader;
