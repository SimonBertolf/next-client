<template>
  <a-collapse
    expand-icon-position="right"
    class="w-full text-center text-primary font-bold text-2xl bg-neutral"
    :bordered="false"
  >
    <a-collapse-panel :key="kpiGroup.id" :header="kpiGroup.category">
      <FlexLayout :column="true" v-for="kpi in kpiGroup.kpis" :key="kpi.id">
        <KpiItem :kpi="kpi" />
        <a-divider class="my-2" v-if="shouldDivide(kpi)" />
      </FlexLayout>
    </a-collapse-panel>
  </a-collapse>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { KpiGroup, Kpi } from '@/models';
import { FlexLayout } from '@/components/app';
import { KpiItem } from '../KpiItem';

@Component({ components: { KpiItem, FlexLayout } })
export default class KpiListMobile extends Vue {
  @Prop({ type: Object as () => KpiGroup }) kpiGroup: KpiGroup;

  shouldDivide(kpi: Kpi): boolean {
    const { kpis } = this.kpiGroup;
    const kpiIndex = kpis.indexOf(kpi);
    const lastIndex = kpis.length - 1;
    return kpiIndex !== lastIndex;
  }
}
</script>

<style>
.ant-collapse-content-box {
  @apply bg-background p-4 !important;
}
</style>
