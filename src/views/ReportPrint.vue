<template>
  <div class="relative left-0 mx-4" :style="{ top: '-6px' }">
    <widget-layout :show-guides="false" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { WidgetLayout } from '../components/reporting';

@Component({ components: { WidgetLayout } })
export default class ReportPrint extends Vue {
  name = 'ReportPrint';
}
</script>

<style scoped></style>
