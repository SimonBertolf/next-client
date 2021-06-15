<template>
  <div class="report m-4">
    <p>{{ `${report.name} (_id: ${report._id})` }}</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Report as ReportInterface } from '@/models';

@Component({ components: {} })
export default class Report extends Vue {
  @Prop(String) readonly reportId: string;

  get report() {
    // TODO: maybe it makes sense to move this logic to store module?
    const data = this.$store.state.Reports.reports.find((report: ReportInterface) => report._id === this.reportId);
    if (!data) {
      this.$router.push('/404');
      throw new Error(`Could not find report with _id ${this.reportId}`);
    }
    return data;
  }

  name = 'Report';
}
</script>

<style scoped></style>
