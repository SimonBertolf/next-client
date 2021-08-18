<template>
  <Tabs>
    <a-tab-pane key="1" tab="Basic Data" class="tab-pane"><BasicData /></a-tab-pane>
    <a-tab-pane key="2" tab="Attributes" class="tab-pane">hey d2u</a-tab-pane>
  </Tabs>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Tabs } from '@/components/app';
import { BasicData } from '../BasicData';

@Component({ components: { Tabs, BasicData } })
export default class AssetTabs extends Vue {}
</script>

<style scoped>
.tab-pane {
  @apply bg-transparent sm:bg-common-400 rounded-none sm:rounded-t-xl;
}
</style>
