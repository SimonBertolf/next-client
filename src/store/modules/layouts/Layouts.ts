import { ResponsiveWidgetItems, WidgetData, WidgetItem, WidgetItems } from '@/models';
import { Layout } from '@/models/Layout';
import { GridBreakpoint } from 'vue-grid-layout';
import { Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { layoutsMock, responsiveLayoutMock } from './LayoutsMock';

// Helpers for development and local demo TODO: romove when done
const locallyStoreLayout = (layout: ResponsiveWidgetItems) => {
  localStorage.setItem('responsiveLayout', JSON.stringify(layout));
};
const locallyReadLayout = (): ResponsiveWidgetItems | undefined => {
  const localLayoutString = localStorage.getItem('responsiveLayout');
  if (localLayoutString) return JSON.parse(localLayoutString);
  return undefined;
};

@Module({ namespaced: true })
export default class Layouts extends VuexModule {
  public responsiveLayout: ResponsiveWidgetItems = locallyReadLayout() || responsiveLayoutMock; // TODO: remove mock

  public cols: { [breakpoint: string]: number } = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };

  public breakpoints: { [breakpoint: string]: number } = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };

  public margin = 16;

  public pageHeight = 1122 - 138; // TODO: change to print page height

  public rowsPerPage = 8; // TODO: change according to design specs

  public layouts: Layout[] = layoutsMock;

  @Mutation
  setResponsiveLayout(responsiveLayout: ResponsiveWidgetItems) {
    this.responsiveLayout = responsiveLayout;
    locallyStoreLayout(this.responsiveLayout);
  }

  @Mutation
  updateResponsiveLayout(payload: { layout: WidgetItems; breakpoint: GridBreakpoint }) {
    const { layout, breakpoint } = payload;
    this.responsiveLayout[breakpoint] = layout;
    locallyStoreLayout(this.responsiveLayout);
    // console.log('this.responsiveLayout[breakpoint]: ', this.responsiveLayout[breakpoint]);
    // TODO: POST change to Server, trigger update action
  }

  @Mutation
  removeWidget(payload: { id: string }) {
    const { id } = payload;
    const breakpoints = Object.keys(this.responsiveLayout);
    breakpoints.forEach((breakpoint: string) => {
      if (this.responsiveLayout[breakpoint]) {
        const index = this.responsiveLayout[breakpoint].findIndex((widgetItem) => widgetItem.i === id);
        if (index < 0) throw new Error('could not find widget to delete');
        this.responsiveLayout[breakpoint].splice(index, 1);
      }
    });
    locallyStoreLayout(this.responsiveLayout);
  }

  @Mutation
  addWidget(payload: WidgetData) {
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
        const newWidget: WidgetItem = {
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
    locallyStoreLayout(this.responsiveLayout);
  }
}
