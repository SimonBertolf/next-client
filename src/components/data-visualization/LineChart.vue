<template>
  <div ref="chartDiv"></div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { cloneDeep, isEqual } from 'lodash';
import * as am4core from '@amcharts/amcharts4/core';
import { XYChart, ValueAxis, LineSeries, CircleBullet } from '@amcharts/amcharts4/charts';
import type { WidgetData } from '@/types';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themesAnimated);

@Component({ components: {} })
export default class LineChart extends Vue {
  @Prop({ type: Array, default: () => [] }) readonly chartData: WidgetData['data'];

  @Prop({ type: String, default: '#3b82f6' }) readonly color: string;

  chart: XYChart | undefined;

  get sortedChartData(): WidgetData['data'] {
    const sortKey = 'x';
    const sortedChartData: WidgetData['data'] = cloneDeep(this.chartData);
    if (sortedChartData.length && typeof sortedChartData[0][sortKey] !== 'number') {
      throw new Error(`Value of ${sortKey} must be number`);
    }
    return sortedChartData.sort((item1, item2) => (item1[sortKey] as number) - (item2[sortKey] as number));
  }

  @Watch('chartData', { immediate: true, deep: true })
  onChartDataChange(newData: WidgetData['data'], oldData: WidgetData['data']): void {
    if (!isEqual(newData, oldData)) {
      this.createChart();
    }
  }

  createChart(): void {
    if (this.chart) this.chart.dispose();
    this.chart = am4core.create(this.$refs.chartDiv as HTMLElement, XYChart);
    this.chart.data = this.sortedChartData;

    const yAxis = this.chart.yAxes.push(new ValueAxis());
    yAxis.title.text = 'Y [%]';

    const xAxis = this.chart.xAxes.push(new ValueAxis());
    xAxis.title.text = 'X [%]';

    const series = this.chart.series.push(new LineSeries());
    series.stroke = am4core.color(this.color);
    series.strokeWidth = 2;
    series.dataFields.valueX = 'x';
    series.dataFields.valueY = 'y';

    const bullet = series.bullets.push(new CircleBullet());
    bullet.stroke = am4core.color(this.color);
    bullet.fill = am4core.color(this.color);
    bullet.strokeWidth = 2;
  }

  beforeDestroy(): void {
    if (this.chart) this.chart.dispose();
  }
}
</script>

<style scoped></style>
