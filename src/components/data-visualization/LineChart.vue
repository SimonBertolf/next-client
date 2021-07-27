<template>
  <div ref="chartDiv"></div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { cloneDeep, isEqual } from 'lodash';
import * as am4core from '@amcharts/amcharts4/core';
import { XYChart, ValueAxis, LineSeries, CircleBullet } from '@amcharts/amcharts4/charts';
import type { ChartData, LineChartAxes, LineChartSeries } from '@/types';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themesAnimated);

@Component({ components: {} })
export default class LineChart extends Vue {
  @Prop({ type: Array, default: () => [] }) readonly chartData: ChartData[];

  @Prop({ type: Array, default: () => [] }) readonly chartSeries: LineChartSeries[];

  @Prop({ type: Object, required: true }) readonly chartAxes!: LineChartAxes;

  @Prop({ type: String, default: '#3b82f6' }) readonly color: string;

  chart: XYChart | undefined;

  @Watch('chartData', { immediate: true, deep: true })
  onChartDataChange(newData: ChartData[], oldData: ChartData[]): void {
    if (!isEqual(newData, oldData)) {
      this.createChart();
    }
  }

  createChart(): void {
    if (this.chart) this.chart.dispose();
    this.chart = am4core.create(this.$refs.chartDiv as HTMLElement, XYChart);
    this.chart.data = cloneDeep(this.chartData);

    const yAxis = this.chart.yAxes.push(new ValueAxis());
    yAxis.title.text = this.chartAxes.y.label;

    const xAxis = this.chart.xAxes.push(new ValueAxis());
    xAxis.title.text = this.chartAxes.x.label;

    this.chartSeries.forEach((chartSeries) => {
      if (!this.chart) throw new Error('Can not add series to undefined chart!');
      const series = this.chart.series.push(new LineSeries());
      series.stroke = am4core.color(chartSeries.color || this.color);
      series.strokeWidth = 2;
      series.dataFields.valueX = chartSeries.x.key;
      series.dataFields.valueY = chartSeries.y.key;

      const bullet = series.bullets.push(new CircleBullet());
      bullet.stroke = am4core.color(chartSeries.color || this.color);
      bullet.fill = am4core.color(chartSeries.color || this.color);
      bullet.strokeWidth = 2;
    });
  }

  beforeDestroy(): void {
    if (this.chart) this.chart.dispose();
  }
}
</script>

<style scoped></style>
