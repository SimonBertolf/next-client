import { ResponsiveWidgetItems, WidgetItems } from '@/types';
import { GridBreakpoint } from 'vue-grid-layout';
import { Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { responsiveLayoutMock } from './LayoutMocks';

@Module({ namespaced: true })
export default class Layouts extends VuexModule {
  public responsiveLayout: ResponsiveWidgetItems = responsiveLayoutMock; // TODO: remove mock

  @Mutation
  setResponsiveLayout(responsiveLayout: ResponsiveWidgetItems) {
    this.responsiveLayout = responsiveLayout;
  }

  @Mutation
  updateResponsiveLayout(payload: { layout: WidgetItems; breakpoint: GridBreakpoint }) {
    const { layout, breakpoint } = payload;
    this.responsiveLayout[breakpoint] = layout;
    // console.log('this.responsiveLayout[breakpoint]: ', this.responsiveLayout[breakpoint]);
    // TODO: POST change to Server, trigger update action
  }
}
