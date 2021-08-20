<template>
  <div class="overflow-hidden h-full">
    <widget-title :title="name" />
    <widget-text :text="info" />
    <bubble-chart :chartData="widgetData" :chartSeries="chartSeries" :chartAxes="chartAxes" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { WidgetData, Filter } from '@/types';
import { XYChartAxes, XYChartSeries } from '@/types/Chart';
import BubbleChart from '@/components/data-visualization/BubbleChart/BubbleChart.vue';
import { LineChart, WidgetTitle, WidgetText } from '@/components/data-visualization';

const relevantFilters = ['assets', 'tenants', 'clients'];

@Component({ components: { LineChart, WidgetTitle, WidgetText, BubbleChart } })
export default class WidgetA extends Vue {
  @Prop(String) readonly id: string;

  @Prop({ default: () => [], type: Array }) readonly widgetData: WidgetData['data'];

  name = 'Widget - A';

  info = 'Bubblechart';

  chartAxes: XYChartAxes = {
    x: { label: 'Bruttoertrag' },
    y: { label: 'Eigenkapitalrenditte %', unit: '%' },
    z: { label: 'Segment', unit: '' },
  };

  chartSeries: XYChartSeries[] = [
    {
      x: { key: 'x' },
      y: { key: 'y' },
      z: { key: 'z', showValue: true, unit: 'K' },
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
