<template>
  <Card :autoSize="true" :hasTitle="false" :padding="true" class="mt-4 report-title">
    {{ `${report.name} (_id: ${report._id})` }}
  </Card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Card } from '@/components/app';
import { Report } from '@/models';

@Component({ components: { Card } })
export default class ReportTitle extends Vue {
  @Prop({ required: true, type: Object }) readonly report: Report;
}
</script>

<style scoped></style>
