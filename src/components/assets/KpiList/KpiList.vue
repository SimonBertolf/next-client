<template>
  <FlexLayout :column="true" :grow="1">
    <h4 class="text-subTitle font-primary text-base">{{ kpiGroup.category }}</h4>
    <a-divider class="my-4" />
    <FlexLayout :column="true" :gap="4" :grow="1">
      <KpiItem v-for="kpi in kpiGroup.kpis" :key="kpi.id" :kpi="kpi" />
    </FlexLayout>
  </FlexLayout>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { FlexLayout } from '@/components/app';
import { KpiGroup } from '@/models';
import { KpiItem } from '../KpiItem';

@Component({ components: { FlexLayout, KpiItem } })
export default class KpiList extends Vue {
  @Prop({ type: Object as () => KpiGroup }) kpiGroup: KpiGroup;
}
</script>

<style scoped></style>
