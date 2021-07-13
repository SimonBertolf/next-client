import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators';
import { cloneDeep } from 'lodash';
import { Report } from '@/models';
import { reportsMock } from './ReportsMock';

@Module({ namespaced: true })
export default class Reports extends VuexModule {
  public reports: Report[] = reportsMock;

  public report: Report | null = null;

  @Mutation
  setReport(report: Report): void {
    this.report = report;
  }

  @Mutation
  flushReport(): void {
    this.report = null;
  }

  @Action
  async loadReport({ _id }: { _id: string }): Promise<void> {
    // TODO: remove Mock
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const report = cloneDeep(reportsMock.find((db) => db._id === _id));
        if (report) {
          this.context.commit('setReport', { ...report });
          resolve();
        } else {
          const error = new Error('Report not found');
          this.context.commit('Errors/setError', error, { root: true });
          reject(error);
        }
      }, Math.random() * 2000);
    });
  }
}
