import { Widget, WidgetData } from '@/types';
import { Module, Mutation, VuexModule, Action } from 'vuex-module-decorators';

@Module({ namespaced: true })
export default class Widgets extends VuexModule {
  public widgets: WidgetData[] = [];

  @Mutation
  removeWidgetData(widgetId: string) {
    const index = this.widgets.findIndex((widget) => widget._id === widgetId);
    if (index < 0) throw new Error(`Could not find widget data of widget with _id ${widgetId}`);
    this.widgets.splice(index, 1);
  }

  @Mutation
  addWidgetData(widget: WidgetData) {
    this.widgets.push(widget);
  }

  @Action
  public async loadWidgetData(widget: Widget): Promise<void> {
    const { _id, type } = widget;
    // TODO: Remove mock, use repository to fetch widget data
    return new Promise((resolve) => {
      setTimeout(() => {
        const data: WidgetData['data'] = {};
        data[type] = [Math.random(), Math.random(), Math.random()];
        this.context.commit('addWidgetData', { _id, data });
        resolve();
      }, Math.random() * 2000);
    });
  }
}
