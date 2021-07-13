<template>
  <div class="relative left-0 top-0 mx-4 -mt-2">
    <widget-layout :show-guides="false" />
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
