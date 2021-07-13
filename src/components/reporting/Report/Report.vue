<template>
  <div class="report">
    <report-title :report="report" />
    <widget-layout />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Report as ReportModel } from '@/models';
import { WidgetLayout } from '@/components/app';
import ReportTitle from './ReportTitle.vue';

@Component({ components: { WidgetLayout, ReportTitle } })
export default class Report extends Vue {
  @Prop(String) readonly reportId: string;

  get report(): ReportModel | undefined {
    return this.$store.state.Reports.report;
  }
}
</script>

<style scoped></style>
