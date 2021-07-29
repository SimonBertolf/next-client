import { cloneDeep } from 'lodash';
import type {
  WidgetLayoutItems,
  WidgetLayoutItem,
  ResponsiveWidgetLayoutItems,
  Widget,
  QueryInterface,
  LayoutHostType,
} from '@/types';
import type { ApiLayout, LayoutMeta } from '@/models';
import { apiWidgetsFromResponsiveLayout, responsiveLayoutFromApiWidgets } from '@/model-mappers';
import { GridBreakpoint } from 'vue-grid-layout';
import { Module, Mutation, VuexModule, Action } from 'vuex-module-decorators';
import type { IRepository } from '@/services';
import { Inject } from 'inversify-props';

@Module({ namespaced: true })
export default class Layouts extends VuexModule {
  // host: knows where the layout is used/hosted
  public host: LayoutHostType | null = null;

  public responsiveLayout: ResponsiveWidgetLayoutItems = {
    lg: [],
    md: [],
    sm: [],
    xs: [],
    xxs: [],
  };

  public cols: { [breakpoint: string]: number } = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };

  public breakpoints: { [breakpoint: string]: number } = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };

  public margin = 16;

  public pageHeight = 1122 - 138; // TODO: change to print page height

  public rowsPerPage = 8; // TODO: change according to design specs

  public layouts: ApiLayout[] = [];

  public loading = {
    layouts: false,
    layout: false,
  };

  public layoutMeta: LayoutMeta | null = null;

  @Inject('LayoutRepository')
  private layoutRepository: IRepository<ApiLayout>;

  @Mutation
  setLoading({ key, loading }: { key: 'layouts' | 'layout'; loading: boolean }): void {
    this.loading[key] = loading;
  }

  @Mutation
  setHost({ host }: { host: LayoutHostType | null }): void {
    this.host = host;
  }

  @Mutation
  setLayouts(layouts: ApiLayout[]): void {
    this.layouts = layouts;
  }

  @Mutation
  setResponsiveLayout(responsiveLayout: ResponsiveWidgetLayoutItems): void {
    this.responsiveLayout = responsiveLayout;
  }

  @Mutation
  setLayoutMeta(layoutMeta: LayoutMeta): void {
    this.layoutMeta = layoutMeta;
  }

  @Action
  updateResponsiveLayout(payload: { layout: WidgetLayoutItems; breakpoint: GridBreakpoint }): void {
    const { layout, breakpoint } = payload;
    const updatedResponsiveLayout: ResponsiveWidgetLayoutItems = cloneDeep(this.responsiveLayout);
    updatedResponsiveLayout[breakpoint] = cloneDeep(layout);
    if (!this.layoutMeta?._id) throw new Error('_id of layout undefined!');
    this.context.dispatch('updateLayout', {
      _id: this.layoutMeta._id,
      widgets: apiWidgetsFromResponsiveLayout(updatedResponsiveLayout),
    });
  }

  @Action
  removeWidget(payload: { _id: string }): void {
    const { _id } = payload;
    const updatedResponsiveLayout: ResponsiveWidgetLayoutItems = cloneDeep(this.responsiveLayout);
    const breakpoints = Object.keys(updatedResponsiveLayout);
    breakpoints.forEach((breakpoint: string) => {
      if (updatedResponsiveLayout[breakpoint]) {
        const index = updatedResponsiveLayout[breakpoint].findIndex((widgetItem) => widgetItem.i === _id);
        // TODO: this error is probably uncaught. Fix!
        if (index < 0) throw new Error('could not find widget to delete');
        updatedResponsiveLayout[breakpoint].splice(index, 1);
      }
    });
    if (!this.layoutMeta?._id) throw new Error('_id of layout undefined!');
    this.context.dispatch('updateLayout', {
      _id: this.layoutMeta._id,
      widgets: apiWidgetsFromResponsiveLayout(updatedResponsiveLayout),
    });
  }

  @Action
  addWidget({ widgetToAdd }: { widgetToAdd: Widget }): void {
    const { type, _id } = widgetToAdd;

    const findFreeCoordinates = (breakpoint: string): [number, number] => {
      // get number of rows and cols of current layout
      const rows = Math.max(...this.responsiveLayout[breakpoint].map((widget) => widget.y + widget.h), 0);
      const cols = this.cols[breakpoint];

      // prepare availability map
      const availabilities = [...new Array<boolean[]>(rows)].map(() => new Array<boolean>(cols).fill(true));

      // mark occupied spots with false on availability map
      this.responsiveLayout[breakpoint].forEach((widget) => {
        const { x, y, w, h } = widget;
        // eslint-disable-next-line no-plusplus
        for (let row = y; row < y + h; row++) {
          // eslint-disable-next-line no-plusplus
          for (let col = x; col < x + w; col++) {
            availabilities[row].splice(col, 1, false);
          }
        }
      });

      // freeY is the first row with availabilities found
      const freeY = availabilities.findIndex((row) => row.reduce((acc, cur) => acc || cur), false);

      // if no free row, place widget on new row
      if (freeY < 0) return [0, rows];

      // freeX is the first spot found in row with availabilities
      const freeX = availabilities[freeY].findIndex((availability) => availability);
      if (freeX < 0) throw new Error(`Could not find free slot on row ${freeY}`);

      return [freeX, freeY];
    };

    const updatedResponsiveLayout: ResponsiveWidgetLayoutItems = cloneDeep(this.responsiveLayout);
    const breakpoints = Object.keys(updatedResponsiveLayout);
    breakpoints.forEach((breakpoint: string) => {
      if (updatedResponsiveLayout[breakpoint]) {
        const [x, y] = findFreeCoordinates(breakpoint);
        const newWidget: WidgetLayoutItem = {
          x,
          y,
          w: 1,
          h: 1,
          i: _id,
          moved: false,
          _id,
          type,
        };
        updatedResponsiveLayout[breakpoint].push(newWidget);
      }
    });
    if (!this.layoutMeta?._id) throw new Error('_id of layout undefined!');
    this.context.dispatch('updateLayout', {
      _id: this.layoutMeta._id,
      widgets: apiWidgetsFromResponsiveLayout(updatedResponsiveLayout),
    });
  }

  @Mutation
  flushResponsiveLayout(): void {
    const breakpoints = Object.keys(this.responsiveLayout);
    breakpoints.forEach((breakpoint: string) => {
      if (this.responsiveLayout[breakpoint]) {
        this.responsiveLayout[breakpoint].splice(0, this.responsiveLayout[breakpoint].length);
      }
    });
  }

  @Action
  setLayout(layout: ApiLayout): void {
    const { widgets, ...meta } = layout;
    const responsiveLayout = responsiveLayoutFromApiWidgets(widgets);
    this.context.commit('setResponsiveLayout', cloneDeep(responsiveLayout));
    this.context.commit('setLayoutMeta', { ...meta });
  }

  @Action
  async loadLayout({ _id }: { _id: string }): Promise<void> {
    try {
      this.context.commit('setLoading', { key: 'layout', loading: true });
      const apiLayout = await this.layoutRepository.getById(_id);
      this.context.dispatch('setLayout', apiLayout);
      this.context.commit('setLoading', { key: 'layout', loading: false });
    } catch (error) {
      this.context.commit('Errors/setError', error, { root: true });
    }
  }

  @Action
  async updateLayout(layoutUpdates: Partial<ApiLayout> & { readonly _id: string }): Promise<void> {
    try {
      this.context.commit('setLoading', { key: 'layout', loading: true });
      const apiLayout = await this.layoutRepository.update(layoutUpdates);
      this.context.dispatch('setLayout', apiLayout);
      this.context.commit('setLoading', { key: 'layout', loading: false });
    } catch (error) {
      this.context.commit('Errors/setError', error, { root: true });
    }
  }

  @Action
  flushLayout(): void {
    this.context.commit('flushResponsiveLayout');
    this.context.commit('setLayoutMeta', null);
  }

  @Action
  async loadLayouts(query?: QueryInterface): Promise<void> {
    try {
      this.context.commit('setLoading', { key: 'layouts', loading: true });
      const layouts = await this.layoutRepository.list(query);
      this.context.commit('setLayouts', layouts);
      this.context.commit('setLoading', { key: 'layouts', loading: false });
    } catch (error) {
      this.context.commit('Errors/setError', error, { root: true });
    }
  }

  @Action
  flushLayouts(): void {
    this.context.commit('setLayouts', new Array<ApiLayout>());
  }
}
