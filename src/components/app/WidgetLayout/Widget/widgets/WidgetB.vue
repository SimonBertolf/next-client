<template>
  <div class="overflow-hidden h-full">
    <widget-title :title="name" />
    <widget-text :text="info" />
    <line-chart
      :chartData="widgetData"
      :chartSeries="chartSeries"
      :chartAxes="chartAxes"
      color="#37F52F"
      class="h-5/6"
    />
    <!-- <pre>{{ JSON.stringify(this.widgetData, null, 2) }}</pre> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { WidgetData, Filter, LineChartSeries, XYChartAxes } from '@/types';
import { LineChart, WidgetTitle, WidgetText } from '@/components/data-visualization';

const relevantFilters = ['regions', 'assets'];

@Component({ components: { LineChart, WidgetTitle, WidgetText } })
export default class WidgetB extends Vue {
  @Prop(String) readonly id: string;

  @Prop({ default: () => [], type: Array }) readonly widgetData: WidgetData['data'];

  name = 'Widget - B';

  info = 'Subtitle or description';

  chartAxes: XYChartAxes = { x: { label: 'X in %' }, y: { label: 'Y in %' } };

  chartSeries: LineChartSeries[] = [
    {
      x: { key: 'x' },
      y: { key: 'y' },
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
