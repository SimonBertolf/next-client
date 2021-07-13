import { Report } from '@/models';
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

  @Mutation
  flushWidgetData() {
    this.widgets.splice(0, this.widgets.length);
  }

  @Action
  public async loadWidgetData({ widget, report }: { widget: Widget; report?: Report }): Promise<void> {
    const { _id, type } = widget;
    this.context.commit('removeWidgetData', { _id });
    if (report) {
      const { data: widgetsData } = report;
      const widgetData = widgetsData.find((item) => item._id === _id);
      if (!widgetData) throw new Error(`Widget data for widget _id=${_id} missing on report`);
      this.context.commit('addWidgetData', { _id, data: widgetData.data });
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      // TODO: Remove mock, use repository to fetch widget data
      setTimeout(() => {
        const data: WidgetData['data'] = [];
        for (let i = 0; i < 3; i += 1) {
          data.push({
            x: Math.random(),
            y: Math.random(),
            z: type,
          });
        }
        this.context.commit('addWidgetData', { _id, data });
        resolve();
      }, Math.random() * 2000);
    });
  }
}
