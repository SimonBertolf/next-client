<template>
  <div ref="chartDiv" class="w-full" style="height: 500px" :chartTitle="chartTitle"></div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import _, { cloneDeep } from 'lodash';
import * as am4core from '@amcharts/amcharts4/core';
import '@amcharts/amcharts4/charts';
// eslint-disable-next-line camelcase
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

@Component
export default class AreaChart extends Vue {
  @Prop({ type: Array, default: () => [] }) readonly data: Array<{
    occurrence: number;
    value: number;
  }>;

  @Prop({ default: '' }) readonly chartTitle: string;

  @Prop({ type: Array, default: () => [] }) readonly guides: Array<{ value: number; label: string }>;

  chart: am4core.Sprite;

  mounted(): void {
    this.createChart();
  }

  @Watch('data', { immediate: true, deep: true })
  onDataChanged(
    val: Array<{
      occurrence: number;
      value: number;
    }>,
    oldVal:
      | Array<{
          occurrence: number;
          value: number;
        }>
      | undefined,
  ): void {
    if (!_.isEqual(val, oldVal)) this.createChart();
  }

  @Watch('guides', { immediate: true, deep: true })
  onGuidesChanged(
    val: Array<{ value: number; label: string }>,
    oldVal: Array<{ value: number; label: string }> | undefined,
  ): void {
    if (!_.isEqual(val, oldVal)) this.createChart();
  }

  createChart(): void {
    if (this.chart) this.chart.dispose();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const axisRanges: Array<any> = [];
    const itsData = [...this.data];
    const sortedData = itsData.sort((a, b) => {
      if (a.value > b.value) {
        return 1;
      }
      if (a.value < b.value) {
        return -1;
      }
      return 0;
    });
    this.guides.forEach(({ value, label }) => {
      const axisRange = {
        category: value,
        endCategory: value,
        axisFill: {
          fill: '#cc9c49',
          fillOpacity: 0.75,
        },
        label: {
          text: label,
          inside: true,
          valign: 'top',
          horizontalCenter: 'left',
          verticalCenter: 'top',
        },
        locations: {
          category: 0.4,
          endCategory: 0.6,
        },
      };
      axisRanges.push({ ...axisRange });
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chartConfiguration: any = {
      type: 'XYChart',
      data: [...sortedData],
      logo: { disabled: true },
      xAxes: [
        {
          type: 'CategoryAxis',
          cursorTooltipEnabled: false,
          numberFormatter: { numberFormat: '#,###.00' },
          renderer: { grid: { strokeOpacity: 0 } },
          dataFields: { category: 'value' },
          axisRanges,
        },
      ],
      yAxes: [
        {
          type: 'ValueAxis',
          numberFormatter: { numberFormat: '#,###.00' },
          cursorTooltipEnabled: false,
          renderer: { grid: { strokeOpacity: 0.2 } },
        },
      ],
      series: [
        {
          id: 's1',
          calculatePercent: true,
          smoothing: 'monotoneX',
          type: 'LineSeries',
          name: this.chartTitle,
          tooltipText: '{valueY.percent}%\n{categoryX.formatNumber("#,###.00")}',
          tooltip: { pointerOrientation: 'vertical' },
          dataFields: {
            categoryX: 'value',
            valueY: 'occurrence',
            valueYShow: 'percent',
          },
          stroke: '#cc9c49',
          strokeWidth: 2,
          fillOpacity: 1,
          fill: '#ddAd5a',
          segments: {
            fillModifier: {
              type: 'LinearGradientModifier',
              opacities: [1, 0],
              offsets: [0, 1],
              gradient: { rotation: 90 },
            },
          },
        },
      ],
      cursor: {
        snapToSeries: 's1',
        lineY: { disabled: true },
        lineX: { disabled: true },
      },
      legend: { position: 'bottom' },
    };
    this.chart = am4core.createFromConfig(
      // TODO: why deep copy needed? replaced JSON.parse(JSON.stringify()) with _.cloneDeep()
      cloneDeep(chartConfiguration),
      this.$refs.chartDiv as HTMLElement,
    );
  }

  beforeDestroy(): void {
    if (this.chart) {
      this.chart.dispose();
    }
  }
}
</script>

<style scoped></style>
