<template>
  <div ref="chartDiv" class="w-full h-screen"></div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { cloneDeep, isEqual } from 'lodash';
import * as am4core from '@amcharts/amcharts4/core';
import { XYChart, ValueAxis, CircleBullet, XYSeries, LabelBullet } from '@amcharts/amcharts4/charts';
import type { ChartData, XYChartAxes, XYChartSeries } from '@/types';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themesAnimated);

@Component({ components: {} })
export default class BubbleChart extends Vue {
  @Prop({ type: Array, default: () => [] }) readonly chartData: ChartData[];

  @Prop({ type: Array, default: () => [] }) readonly chartSeries: XYChartSeries[];

  @Prop({ type: Object, required: true }) readonly chartAxes: XYChartAxes;

  @Prop({ type: String, default: 'primary' }) readonly color: string;

  chart: XYChart | undefined;

  labelY = 'Eigenkapitalrendite (ROE)';

  unitY = '%';

  labelX = 'Anlagekosten in CHFm';

  unitX = '';

  bubbleMin = 10;

  bubbleMax = 20;

  @Watch('chartData', { immediate: true, deep: true })
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

    const yAxis = this.chart.yAxes.push(new ValueAxis());
    yAxis.title.text = this.labelY;
    yAxis.title.fontWeight = 'bold';
    yAxis.renderer.labels.template.adapter.add('text', (text) => `${text}${this.unitY}`);

    const xAxis = this.chart.xAxes.push(new ValueAxis());
    xAxis.title.text = this.labelX;
    xAxis.title.fontWeight = 'bold';

    this.chart.logo.disabled = true;

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
        min: this.bubbleMin,
        max: this.bubbleMax,
        property: 'radius',
        logarithmic: false,
      });
    });

    this.chart.responsive.useDefault = false;
    let contentDiagonale = 0;
    this.chart.responsive.rules.push({
      relevant: function (target) {
        contentDiagonale = Math.sqrt(
          target.contentWidth * target.contentWidth + target.contentHeight * target.contentHeight,
        );
        return true;
      },
      /* @ts-ignore*/
      state: function (target, stateId) {
        if (target instanceof XYChart) {
          contentDiagonale = Math.sqrt(
            target.contentWidth * target.contentWidth + target.contentHeight * target.contentHeight,
          );
        }
        if (target instanceof CircleBullet) {
          const state = target.circle.states.create(stateId);
          console.log(contentDiagonale);
          /* @ts-ignore*/
          if (contentDiagonale >= 1100) state.properties.scale = 2.0;
          if (contentDiagonale <= 1100) state.properties.scale = 1.8;
          if (contentDiagonale <= 900) state.properties.scale = 1.6;
          if (contentDiagonale <= 700) state.properties.scale = 1.2;
          if (contentDiagonale <= 500) state.properties.scale = 1.0;
          return state;
        }
        return;
      },
    });
  }

  beforeDestroy(): void {
    if (this.chart) this.chart.dispose();
  }
}
</script>

<style scoped></style>
