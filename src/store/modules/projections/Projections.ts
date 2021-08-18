import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators';
import type { Projection } from '@/models';
import { mockProtections } from './ProjectionsMock';

type Resolution = 'yearly' | 'quarterly' | 'monthly';

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

  public resolution: Resolution = 'yearly';

  get months(): number {
    if (this.projection) {
      const from = new Date(this.projection.from);
      const to = new Date(this.projection.to);
      if (from > to) throw new Error('Start date (from) must be before end date (to)!');
      return 12 * (to.getFullYear() - from.getFullYear()) - from.getMonth() + to.getMonth() + 1;
    }
    return 0;
  }

  get quarters(): number {
    if (this.projection) {
      const from = new Date(this.projection.from);
      const to = new Date(this.projection.to);
      if (from > to) throw new Error('Start date (from) must be before end date (to)!');
      return (
        4 * (to.getFullYear() - from.getFullYear() - 1) +
        Math.ceil((12 - from.getMonth()) / 3) +
        Math.ceil((to.getMonth() + 1) / 3)
      );
    }
    return 0;
  }

  get years(): number {
    if (this.projection) {
      const from = new Date(this.projection.from);
      const to = new Date(this.projection.to);
      if (from > to) throw new Error('Start date (from) must be before end date (to)!');
      return to.getFullYear() - from.getFullYear() + 1;
    }
    return 0;
  }

  @Mutation
  setLoading({ key, loading }: { key: 'projections' | 'projection' | 'newProjection'; loading: boolean }): void {
    this.loading[key] = loading;
  }

  @Mutation
  setProjection(projection: Projection | null): void {
    this.projection = projection;
  }

  @Mutation
  setResolution(resolution: Resolution): void {
    this.resolution = resolution;
  }

  @Action
  async loadProjection({ _id }: { _id: string }): Promise<void> {
    try {
      this.context.commit('setLoading', { key: 'projection', loading: true });
      const projection = this.projections.find((item) => item._id === _id) || null;
      if (projection === null) throw new Error(`Could not find projection with _id ${_id}`);
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
