<template>
  <div class="overflow-hidden">
    <div id="chartdiv" class="h-full pb-6" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

@Component({ components: {} })
export default class BubbleChart extends Vue {
  @Prop(Array) readonly data: any;

  @Prop(String) readonly id: string;

  name = 'WidgetPortfoliomatrix';

  chart: any = '';

  get widgetData() {
    return this.$store.state.Reports.widgetDataPortfolio;
  }

  mounted() {
    const chart = am4core.create(`chartdiv${this.id}`, am4charts.XYChart);
    const title = chart.titles.create();
    title.text = 'Asset im Portfoliovergleich';
    title.fontSize = 25;
    title.align = 'left';
    title.paddingBottom = 10;
    const label = chart.chartContainer.createChild(am4core.Label);
    label.text = 'Bubble size = Bruttoertrag (IST) per annum';
    label.fontSize = 15;
    label.paddingTop = 15;

    const valueAxisX = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxisX.renderer.ticks.template.disabled = true;
    valueAxisX.renderer.axisFills.template.disabled = true;
    valueAxisX.title.text = '[bold]Anlagekosten in CHF[/]';

    const valueAxisY = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxisY.renderer.ticks.template.disabled = true;
    valueAxisY.renderer.axisFills.template.disabled = true;
    valueAxisY.title.text = '[bold]Bruttorendite (IST)[/]';

    let series: any = null;
    series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueX = 'x';
    series.dataFields.valueY = 'y';
    series.dataFields.value = 'value';
    series.strokeOpacity = 0;
    series.sequencedInterpolation = true;
    series.tooltip.pointerOrientation = 'vertical';

    const bullet = series.bullets.push(new am4core.Circle());
    bullet.propertyFields.fill = 'color';
    bullet.strokeOpacity = 0;
    bullet.strokeWidth = 2;
    bullet.fillOpacity = 0.5;
    bullet.hiddenState.properties.opacity = 0;
    const tooltip1 = '[bold]{title}:[/]\n Bruttoertrag (IST): {value.value}\n';
    const tooltip2 = 'Anlagekosten: {valueX.value}\n Bruttorendite (IST):{valueY.value}';
    bullet.tooltipText = `${tooltip1}${tooltip2}`;
    const outline = chart.plotContainer.createChild(am4core.Circle);
    outline.fillOpacity = 0;
    outline.strokeOpacity = 0.8;
    outline.strokeWidth = 2;
    outline.hide(0);

    const blurFilter = new am4core.BlurFilter();
    outline.filters.push(blurFilter);
    const hoverState = bullet.states.create('hover');
    hoverState.properties.fillOpacity = 1;
    hoverState.properties.strokeOpacity = 1;

    series.heatRules.push({ target: bullet, min: 2, max: 60, property: 'radius' });

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = 'zoomXY';
    chart.cursor.snapToSeries = series;
    chart.data = this.widgetData;
    this.chart = chart;
  }

  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
}
</script>

<style scoped></style>
