import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators';
import { cloneDeep } from 'lodash';
import type { Projection, ProjectionMeta, ProjectionMilestone, ProjectionSection, Resolution } from '@/models';
import { DataColumn } from '@/types';
import { mockProtections } from './ProjectionsMock';

@Module({ namespaced: true })
export default class Projections extends VuexModule {
  public projections: Projection[] = mockProtections;

  public projectionMeta: ProjectionMeta | null = null;

  public sections: ProjectionSection[] = [];

  public milestones: ProjectionMilestone[] = [];

  public loading = {
    projections: false,
    projection: false,
    newProjection: false,
    pdf: false,
  };

  public dataColumns: DataColumn[] = [];

  get months(): number {
    if (this.projectionMeta) {
      const from = new Date(this.projectionMeta.from);
      const to = new Date(this.projectionMeta.to);
      if (from > to) throw new Error('Start date (from) must be before end date (to)!');
      return 12 * (to.getFullYear() - from.getFullYear()) - from.getMonth() + to.getMonth() + 1;
    }
    return 0;
  }

  get quarters(): number {
    if (this.projectionMeta) {
      const from = new Date(this.projectionMeta.from);
      const to = new Date(this.projectionMeta.to);
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
    if (this.projectionMeta) {
      const from = new Date(this.projectionMeta.from);
      const to = new Date(this.projectionMeta.to);
      if (from > to) throw new Error('Start date (from) must be before end date (to)!');
      return to.getFullYear() - from.getFullYear() + 1;
    }
    return 0;
  }

  get dataColumnsLength(): number {
    if (this.projectionMeta) {
      switch (this.projectionMeta.resolution) {
        case 'yearly':
          return this.years;
        case 'quarterly':
          return this.quarters;
        case 'monthly':
          return this.months;
        default:
          throw new Error(`the resulution ${this.projectionMeta.resolution} is not supported`);
      }
    }
    return 0;
  }

  @Mutation
  setLoading({ key, loading }: { key: 'projections' | 'projection' | 'newProjection'; loading: boolean }): void {
    this.loading[key] = loading;
  }

  @Mutation
  setSections(sections: ProjectionSection[]): void {
    this.sections = sections;
  }

  @Mutation
  setMilestones(milestones: ProjectionMilestone[]): void {
    this.milestones = milestones;
  }

  @Mutation
  setProjectionMeta(meta: ProjectionMeta | null): void {
    this.projectionMeta = meta;
  }

  @Mutation
  setDataColumns(columns: DataColumn[]): void {
    this.dataColumns = columns;
  }

  @Action
  setResolution(resolution: Resolution): void {
    const newProjectionMeta = { ...this.projectionMeta };
    newProjectionMeta.resolution = resolution;
    this.context.commit('setProjectionMeta', newProjectionMeta);
  }

  @Action
  buildDataColumns(): void {
    const dataColumns: DataColumn[] = [...new Array(this.dataColumnsLength)].map((item, index) => {
      const column = { name: `col ${index}` };
      return column;
    });
    this.context.commit('setDataColumns', dataColumns);
  }

  @Action
  setProjection(projection: Projection): void {
    const { sections, milestones, ...rest } = projection;
    this.context.commit('setSections', cloneDeep(sections));
    this.context.commit('setMilestones', cloneDeep(milestones));
    this.context.commit('setProjectionMeta', { ...rest });
  }

  @Action
  async loadProjection({ _id }: { _id: string }): Promise<void> {
    try {
      this.context.commit('setLoading', { key: 'projection', loading: true });
      const projection = this.projections.find((item) => item._id === _id) || null;
      if (projection === null) throw new Error(`Could not find projection with _id ${_id}`);
      this.context.dispatch('setProjection', projection);
      this.context.commit('setLoading', { key: 'projection', loading: false });
    } catch (error) {
      this.context.commit('Errors/setError', error, { root: true });
    }
  }

  @Action
  flushProjection(): void {
    this.context.commit('setSections', []);
    this.context.commit('setMilestones', []);
    this.context.commit('setDataColumns', []);
    this.context.commit('setProjectionMeta', null);
  }
}
