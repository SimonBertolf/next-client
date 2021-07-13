import Vue from 'vue';
import { injectable } from 'inversify-props';
import { IEventBus } from '../../interfaces';

@injectable()
class EventBus implements IEventBus {
  private vueInstance: Vue = new Vue();

  $emit(event: string): void {
    this.vueInstance.$emit(event);
  }

  $on(event: string, callback: () => void): void {
    this.vueInstance.$on(event, callback);
  }
}

export default EventBus;
