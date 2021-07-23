<template>
  <div class="overflow-hidden">
    <div class="relative left-0 top-0 mx-4 -my-2">
      <widget-layout :show-guides="false" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { WidgetLayout } from '@/components/app';

@Component({ components: { WidgetLayout } })
export default class ReportPrint extends Vue {
  name = 'ReportPrint';
}
</script>

<style scoped></style>
