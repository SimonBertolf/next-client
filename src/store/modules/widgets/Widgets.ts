import type { Report } from '@/models';
import type { Widget, WidgetData } from '@/types';
import { Module, Mutation, VuexModule, Action } from 'vuex-module-decorators';

@Module({ namespaced: true })
export default class Widgets extends VuexModule {
  public widgets: WidgetData[] = [];

  @Mutation
  removeWidgetData({ widgetId }: { widgetId: string }): void {
    const index = this.widgets.findIndex((widget) => widget.widget === widgetId);
    // if widget data for given _id exists, remove it.
    if (index >= 0) this.widgets.splice(index, 1);
  }

  @Mutation
  addWidgetData(widget: WidgetData): void {
    this.widgets.push(widget);
  }

  @Mutation
  flushWidgetData(): void {
    this.widgets.splice(0, this.widgets.length);
  }

  @Action
  public async loadWidgetData({ widget, report }: { widget: Widget; report?: Report }): Promise<void> {
    const { _id: widgetId, type } = widget;
    this.context.commit('removeWidgetData', { widgetId });
    if (report) {
      const { data: widgetsData } = report;
      const widgetData = widgetsData.find((item) => item.widget === widgetId);
      if (!widgetData) throw new Error(`Widget data for widget _id=${widgetId} missing on report`);
      this.context.commit('addWidgetData', { widget: widgetId, data: widgetData.data });
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
        this.context.commit('addWidgetData', { widget: widgetId, data });
        resolve();
      }, Math.random() * 2000);
    });
  }
}
