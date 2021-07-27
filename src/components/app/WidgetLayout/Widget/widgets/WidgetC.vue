<template>
  <div class="overflow-hidden h-full">
    <a-icon class="text-4xl" type="line-chart" />
    <h3 class="pb-4">Widget {{ name }}</h3>
    <line-chart
      :chartData="widgetData"
      :chartSeries="chartSeries"
      :chartAxes="chartAxes"
      color="#F553AE"
      class="h-5/6"
    />
    <!-- <pre>{{ JSON.stringify(this.widgetData, null, 2) }}</pre> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { WidgetData, Filter, LineChartSeries, LineChartAxes } from '@/types';
import { LineChart } from '@/components/data-visualization';

const relevantFilters = ['period', 'kinds', 'usages', 'assets'];

@Component({ components: { LineChart } })
export default class WidgetC extends Vue {
  @Prop(String) readonly id: string;

  @Prop({ default: () => [], type: Array }) readonly widgetData: WidgetData['data'];

  name = 'C';

  chartAxes: LineChartAxes = { x: { label: 'X in %' }, y: { label: 'Y in %' } };

  chartSeries: LineChartSeries[] = [
    {
      x: { key: 'x' },
      y: { key: 'y' },
    },
    {
      x: { key: 'y' },
      y: { key: 'x' },
      color: '#E2B007',
    },
  ];

  @Watch('$store.state.Dashboards.updatedFilters', { deep: true, immediate: false })
  onUpdatedFiltersChange(updatedFilters: Filter['key'][]): void {
    if (relevantFilters.reduce((acc, cur) => acc || updatedFilters.includes(cur), false)) {
      this.$store.dispatch('Widgets/loadWidgetData', { widget: { _id: this.id, type: this.$options.name } });
    }
  }
}
</script>

<style scoped></style>
