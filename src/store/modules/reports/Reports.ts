import { Module, VuexModule } from 'vuex-module-decorators';
import { Report } from '@/models';
import { reportsMock } from './ReportsMock';

@Module({ namespaced: true })
export default class Reports extends VuexModule {
  public reports: Report[] = reportsMock;
}
