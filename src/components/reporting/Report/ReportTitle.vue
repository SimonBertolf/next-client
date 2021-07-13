<template>
  <Card :autoSize="true" :hasTitle="false" :padding="true" class="mt-4 report-title">
    {{ `${name} (_id: ${_id})` }}
  </Card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Card } from '@/components/app';
import { Report } from '@/models';

@Component({ components: { Card } })
export default class ReportTitle extends Vue {
  @Prop({ default: null, type: Object }) readonly report: Report | null;

  get name(): string | undefined {
    return this.report?.name;
  }

  get _id(): string | undefined {
    return this.report?._id;
  }
}
</script>

<style scoped></style>
