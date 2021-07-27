<template>
  <div class="report">
    <spinner :spinning="loading">
      <report-title :report="report" />
      <widget-layout />
    </spinner>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Report as ReportModel } from '@/models';
import { WidgetLayout, Spinner } from '@/components/app';
import ReportTitle from './ReportTitle.vue';

@Component({ components: { WidgetLayout, ReportTitle, Spinner } })
export default class Report extends Vue {
  @Prop(String) readonly reportId: string;

  get loading(): boolean {
    return this.$store.state.Reports.loading.report;
  }

  get report(): ReportModel | undefined {
    return this.$store.state.Reports.report;
  }
}
</script>

<style scoped></style>
