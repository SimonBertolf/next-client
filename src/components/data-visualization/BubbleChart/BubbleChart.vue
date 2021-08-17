<template>
  <div ref="chartDiv"></div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { cloneDeep, isEqual } from 'lodash';
import * as am4core from '@amcharts/amcharts4/core';
import { XYChart, ValueAxis, LineSeries, CircleBullet, XYSeries, LabelBullet } from '@amcharts/amcharts4/charts';
import type { ChartData, LineChartAxes, LineChartSeries, XYChartAxes, XYChartSeries } from '@/types';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themesAnimated);

@Component({ components: {} })
export default class BubbleChart extends Vue {
  @Prop({ type: Array, default: () => [] }) readonly chartData: ChartData[];

  @Prop({ type: Array, default: () => [] }) readonly chartSeries: XYChartSeries[];

  @Prop({ type: Object, required: true }) readonly chartAxes!: XYChartAxes;

  @Prop({ type: String, default: 'primary' }) readonly color: string;

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
    yAxis.title.text = 'Eigenkapitalrendite (ROE)';
    yAxis.title.fontWeight = 'bold';
    yAxis.renderer.labels.template.adapter.add('text', (text) => `${text}%`);

    const xAxis = this.chart.xAxes.push(new ValueAxis());
    xAxis.title.text = 'Anlagekosten in CHFm';
    xAxis.title.fontWeight = 'bold';

    this.chartSeries.forEach((chartSeries) => {
      if (!this.chart) throw new Error('Can not add series to undefined chart!');

      const series = this.chart.series.push(new XYSeries());
      series.dataFields.valueX = chartSeries.x.key;
      series.dataFields.valueY = chartSeries.y.key;
      series.dataFields.value = chartSeries.z.key;
      series.strokeOpacity = 0;

      const bullet = series.bullets.push(new CircleBullet());
      bullet.fill = am4core.color(chartSeries.color || this.color);
      bullet.fillOpacity = 0.4;
      bullet.strokeOpacity = 0.0;

      const labelBullet = series.bullets.push(new LabelBullet());
      labelBullet.label.text = '{value}';
      labelBullet.label.fill = am4core.color('#FFFFFF');
      labelBullet.fontSize = 9;

      series.heatRules.push({
        target: bullet.circle,
        min: 5,
        max: 20,
        property: 'radius',
      });
    });
  }

  beforeDestroy(): void {
    if (this.chart) this.chart.dispose();
  }
}
</script>

<style scoped></style>
