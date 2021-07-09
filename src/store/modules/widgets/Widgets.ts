import { Widget, WidgetData } from '@/types';
import { Module, Mutation, VuexModule, Action } from 'vuex-module-decorators';

@Module({ namespaced: true })
export default class Widgets extends VuexModule {
  public widgets: WidgetData[] = [];

  @Mutation
  removeWidgetData({ _id }: { _id: string }) {
    const index = this.widgets.findIndex((widget) => widget._id === _id);
    // if widget data for given _id exists, remove it.
    if (index >= 0) this.widgets.splice(index, 1);
  }

  @Mutation
  addWidgetData(widget: WidgetData) {
    this.widgets.push(widget);
  }

  @Action
  public async loadWidgetData(widget: Widget): Promise<void> {
    const { _id, type } = widget;
    this.context.commit('removeWidgetData', { _id });
    // TODO: Remove mock, use repository to fetch widget data
    // TODO: implement check: if filters? then use filters and fetch, if report with data, use that data
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
