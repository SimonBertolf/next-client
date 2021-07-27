import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators';
import type { Report } from '@/models';
import type { QueryInterface, WidgetData } from '@/types';
import { Inject } from 'inversify-props';
import type { IRepositoryWithPdf } from '@/services';

@Module({ namespaced: true })
export default class Reports extends VuexModule {
  public reports: Report[] = [];

  public report: Report | null = null;

  public loading = {
    reports: false,
    report: false,
    newReport: false,
    pdf: false,
  };

  @Inject('ReportRepository')
  private reportRepository: IRepositoryWithPdf<Report>;

  @Mutation
  setLoading({ key, loading }: { key: 'reports' | 'report' | 'newReport'; loading: boolean }): void {
    this.loading[key] = loading;
  }

  @Mutation
  setReport(report: Report): void {
    this.report = report;
  }

  @Mutation
  setReports(reports: Report[]): void {
    this.reports = reports;
  }

  @Action
  async loadReport({ _id }: { _id: string }): Promise<void> {
    try {
      this.context.commit('setLoading', { key: 'report', loading: true });
      const report = await this.reportRepository.getById(_id);
      this.context.commit('setReport', report);
      this.context.commit('setLoading', { key: 'report', loading: false });
    } catch (error) {
      this.context.commit('Errors/setError', error, { root: true });
    }
  }

  @Action
  flushReport(): void {
    this.context.commit('setReport', null);
  }

  @Action
  async loadReports(query: QueryInterface): Promise<void> {
    try {
      this.context.commit('setLoading', { key: 'reports', loading: true });
      const reports = await this.reportRepository.list(query);
      this.context.commit('setReports', reports);
      this.context.commit('setLoading', { key: 'reports', loading: false });
    } catch (error) {
      this.context.commit('Errors/setError', error, { root: true });
    }
  }

  @Action
  flushReports(): void {
    this.context.commit('setReports', new Array<Report>());
  }

  @Action
  async newReport(payload: {
    widgetsData: WidgetData[];
    layoutId: string;
    name: string;
    description: string;
  }): Promise<Report | undefined> {
    try {
      this.context.commit('setLoading', { key: 'newReport', loading: true });
      const { widgetsData, layoutId, name, description } = payload;
      const report = await this.reportRepository.create({ name, description, layout: layoutId, data: widgetsData });
      this.context.commit('setLoading', { key: 'newReport', loading: false });
      return report;
      // this.context.commit('setLoading', { key: 'newReport', loading: false });
    } catch (error) {
      this.context.commit('Errors/setError', error, { root: true });
    }
    return undefined;
  }

  @Action
  async loadPdf(): Promise<void> {
    try {
      this.context.commit('setLoading', { key: 'pdf', loading: true });
      if (!this.report?._id) throw new Error('Report or its _id is undefined!');
      const pdf = await this.reportRepository.getPdfById(this.report._id);
      const pdfFile = new Blob([pdf], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(pdfFile);
      window.open(fileURL, '_blank');
      this.context.commit('setLoading', { key: 'pdf', loading: false });
    } catch (error) {
      this.context.commit('Errors/setError', error, { root: true });
    }
  }
}
