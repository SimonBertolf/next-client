import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators';
import type { Projection } from '@/models';
import { mockProtections } from './ProjectionsMock';

@Module({ namespaced: true })
export default class Projections extends VuexModule {
  public projections: Projection[] = mockProtections;

  public projection: Projection | null = null;

  public loading = {
    projections: false,
    projection: false,
    newProjection: false,
    pdf: false,
  };

  @Mutation
  setLoading({ key, loading }: { key: 'projections' | 'projection' | 'newProjection'; loading: boolean }): void {
    this.loading[key] = loading;
  }

  @Mutation
  setProjection(projection: Projection | null): void {
    this.projection = projection;
  }

  @Action
  async loadProjection({ _id }: { _id: string }): Promise<void> {
    try {
      this.context.commit('setLoading', { key: 'projection', loading: true });
      const projection = this.projections.find((item) => item._id === _id) || null;
      this.context.commit('setProjection', projection);
      this.context.commit('setLoading', { key: 'projection', loading: false });
    } catch (error) {
      this.context.commit('Errors/setError', error, { root: true });
    }
  }

  @Action
  flushProjection(): void {
    this.context.commit('setProjection', null);
  }
}
