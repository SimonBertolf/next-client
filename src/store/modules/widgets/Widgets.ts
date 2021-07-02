import { WidgetData } from '@/types';
import { Module, VuexModule } from 'vuex-module-decorators';

@Module({ namespaced: true })
export default class Widgets extends VuexModule {
  public widgets: WidgetData[] = [];
}
