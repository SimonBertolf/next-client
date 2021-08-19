<template>
  <div class="overflow-hidden h-full">
    <widget-title :title="name" align="affe" />
    <widget-text :text="info" />
    <bubble-chart
      :chartData="widgetData"
      :chartSeries="chartSeries"
      :chartAxes="chartAxes"
      unitY="%"
      unitX="K"
      :labelZ="true"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { WidgetData, Filter, XYChartAxes, XYChartSeries } from '@/types';
import BubbleChart from '@/components/data-visualization/BubbleChart/BubbleChart.vue';
import { LineChart, WidgetTitle, WidgetText } from '@/components/data-visualization';

const relevantFilters = ['assets', 'tenants', 'clients'];

@Component({ components: { LineChart, WidgetTitle, WidgetText, BubbleChart } })
export default class WidgetA extends Vue {
  @Prop(String) readonly id: string;

  @Prop({ default: () => [], type: Array }) readonly widgetData: WidgetData['data'];

  name = 'Widget - A';

  info = 'Subtitle or description';

  chartAxes: XYChartAxes = { x: { label: 'Bruttoertrag' }, y: { label: 'Eigenkapitalrenditte %' } };

  chartSeries: XYChartSeries[] = [
    {
      x: { key: 'x' },
      y: { key: 'y' },
      z: { key: 'z' },
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
