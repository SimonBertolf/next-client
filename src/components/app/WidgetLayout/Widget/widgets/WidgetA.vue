<template>
  <div class="overflow-hidden">
    <a-icon class="text-4xl" type="dot-chart" />
    <h3>Widget {{ name }}</h3>
    <pre>{{ JSON.stringify(this.widgetData, null, 2) }}</pre>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { WidgetData, Filter } from '@/types';

const relevantFilters = ['assets', 'tenants', 'clients'];

@Component({ components: {} })
export default class WidgetA extends Vue {
  @Prop(String) readonly id: string;

  @Prop({ default: [], type: Array }) readonly widgetData: WidgetData['data'];

  name = 'A';

  @Watch('$store.state.Dashboards.updatedFilters', { deep: true, immediate: false })
  onUpdatedFiltersChange(updatedFilters: Filter['key'][]) {
    if (relevantFilters.reduce((acc, cur) => acc || updatedFilters.includes(cur), false)) {
      this.$store.dispatch('Widgets/loadWidgetData', { widget: { _id: this.id, type: this.$options.name } });
    }
  }
}
</script>

<style scoped></style>
