import { cloneDeep } from 'lodash';
import { WidgetLayoutItems, WidgetLayoutItem, ResponsiveWidgetLayoutItems, Widget } from '@/types';
import { Layout, LayoutMeta } from '@/models/Layout';
import { GridBreakpoint } from 'vue-grid-layout';
import { Module, Mutation, VuexModule, Action } from 'vuex-module-decorators';
import { layoutsMock } from './LayoutsMock';

@Module({ namespaced: true })
export default class Layouts extends VuexModule {
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

  public layouts: Layout[] = layoutsMock;

  public layoutMeta: LayoutMeta | null = null;

  // TODO: uncomment if loading status is needed
  // public get loading() {
  //   return (
  //   Object.entries(this.responsiveLayout).reduce((acc, cur) => acc || cur[1].length === 0, false) && !this.layoutMeta
  //   );
  // }

  @Mutation
  setResponsiveLayout(responsiveLayout: ResponsiveWidgetLayoutItems) {
    this.responsiveLayout = responsiveLayout;
  }

  @Mutation
  setLayoutMeta(layoutMeta: LayoutMeta) {
    this.layoutMeta = layoutMeta;
  }

  @Mutation
  updateResponsiveLayout(payload: { layout: WidgetLayoutItems; breakpoint: GridBreakpoint }) {
    const { layout, breakpoint } = payload;
    this.responsiveLayout[breakpoint] = layout;
    // console.log('this.responsiveLayout[breakpoint]: ', this.responsiveLayout[breakpoint]);
    // TODO: POST change to Server, trigger update action
  }

  @Mutation
  removeWidget(payload: { _id: string }) {
    const { _id } = payload;
    const breakpoints = Object.keys(this.responsiveLayout);
    breakpoints.forEach((breakpoint: string) => {
      if (this.responsiveLayout[breakpoint]) {
        const index = this.responsiveLayout[breakpoint].findIndex((widgetItem) => widgetItem.i === _id);
        // TODO: this error is probably uncaught. Fix!
        if (index < 0) throw new Error('could not find widget to delete');
        this.responsiveLayout[breakpoint].splice(index, 1);
      }
    });
  }

  @Mutation
  addWidget(payload: Widget) {
    const { type, _id } = payload;

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

    const breakpoints = Object.keys(this.responsiveLayout);
    breakpoints.forEach((breakpoint: string) => {
      if (this.responsiveLayout[breakpoint]) {
        const [x, y] = findFreeCoordinates(breakpoint);
        const newWidget: WidgetLayoutItem = {
          x,
          y,
          w: 1,
          h: 1,
          i: _id,
          _id,
          type,
        };
        this.responsiveLayout[breakpoint].push(newWidget);
      }
    });
  }

  @Mutation
  flushLayout() {
    const breakpoints = Object.keys(this.responsiveLayout);
    breakpoints.forEach((breakpoint: string) => {
      if (this.responsiveLayout[breakpoint]) {
        this.responsiveLayout[breakpoint].splice(0, this.responsiveLayout[breakpoint].length);
      }
    });
    this.layoutMeta = null;
  }

  @Action
  setLayout(layout: Layout) {
    const { responsiveLayout, _id, name } = layout;
    this.context.commit('setResponsiveLayout', { ...cloneDeep(responsiveLayout) });
    this.context.commit('setLayoutMeta', { _id, name });
  }

  @Action
  loadLayout({ _id }: { _id: string }): Promise<void> {
    // TODO: remove Mock
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const layout = layoutsMock.find((item) => item._id === _id);
        if (layout) {
          const { responsiveLayout, _id: layoutId, name } = layout;
          this.context.commit('setResponsiveLayout', { ...cloneDeep(responsiveLayout) });
          this.context.commit('setLayoutMeta', { _id: layoutId, name });
          resolve();
        } else {
          const error = new Error('Layout not found');
          this.context.commit('Errors/setError', error, { root: true });
          reject(error);
        }
      }, Math.random() * 2000);
    });
  }
}
