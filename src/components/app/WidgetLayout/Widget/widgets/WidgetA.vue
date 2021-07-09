<template>
  <div class="overflow-hidden">
    <a-icon class="text-4xl" type="dot-chart" />
    <h3>Widget {{ name }}</h3>
    <pre>{{ JSON.stringify(this.widgetData, null, 2) }}</pre>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { WidgetData } from '@/types';

@Component({ components: {} })
export default class WidgetA extends Vue {
  @Prop(String) readonly id: string;

  @Prop({ default: [], type: Array }) readonly widgetData: WidgetData['data'];

  name = 'A';
}
</script>

<style scoped></style>
