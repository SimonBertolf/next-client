<template>
  <div ref="chartDiv" class="w-full h-full pb-16 justify-start"></div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { cloneDeep, isEqual } from 'lodash';
import * as am4core from '@amcharts/amcharts4/core';
import { XYChart, ValueAxis, LineSeries, CircleBullet } from '@amcharts/amcharts4/charts';
import type { ChartData, XYChartAxes, LineChartSeries } from '@/types/Chart';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themesAnimated);

@Component({ components: {} })
export default class LineChart extends Vue {
  @Prop({ type: Array, required: true }) readonly chartData: ChartData[];

  @Prop({ type: Array, required: true }) readonly chartSeries: LineChartSeries[];

  @Prop({ type: Object, required: true }) readonly chartAxes: XYChartAxes;

  chart: XYChart | undefined;

  @Watch('chartData', { immediate: false, deep: true })
  onChartDataChange(newData: ChartData[], oldData: ChartData[]): void {
    if (!isEqual(newData, oldData)) {
      this.createChart();
    }
  }

  mounted(): void {
    this.createChart();
  }

  createChart(): void {
    if (this.chart) this.chart.dispose();
    this.chart = am4core.create(this.$refs.chartDiv as HTMLElement, XYChart);
    this.chart.data = cloneDeep(this.chartData);

    this.chart.responsive.enabled = true;
    this.chart.responsive.useDefault = false;
    this.chart.paddingLeft = 0;
    this.chart.paddingBottom = 0;

    const yAxis = this.chart.yAxes.push(new ValueAxis());
    yAxis.title.text = this.chartAxes.y.label;
    yAxis.title.fontWeight = 'bold';
    yAxis.renderer.labels.template.adapter.add('text', (text) => `${text}${this.chartAxes.y.unit}`);

    const xAxis = this.chart.xAxes.push(new ValueAxis());
    xAxis.title.text = this.chartAxes.x.label;
    xAxis.title.fontWeight = 'bold';
    xAxis.renderer.labels.template.adapter.add('text', (text) => `${text}${this.chartAxes.x.unit}`);

    this.chartSeries.forEach((chartSeries) => {
      if (!this.chart) throw new Error('Can not add series to undefined chart!');

      const series = this.chart.series.push(new LineSeries());
      if (chartSeries.showStroke) {
        series.stroke = am4core.color(chartSeries.color || '#000000');
        series.strokeWidth = 1.5;
      }
      series.dataFields.valueX = chartSeries.x.key;
      series.dataFields.valueY = chartSeries.y.key;

      if (chartSeries.showBullet) {
        const bullet = series.bullets.push(new CircleBullet());
        bullet.fill = am4core.color(chartSeries.color || '#000000');
        bullet.strokeWidth = 0;
        bullet.circle.radius = 3;
      }
    });
  }

  beforeDestroy(): void {
    if (this.chart) this.chart.dispose();
  }
}
</script>

<style scoped></style>
