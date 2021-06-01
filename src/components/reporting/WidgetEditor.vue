<template>
  <div class="widget-editor">
    <a-space class="mb-4 mx-4"> Editable: <a-switch default-checked v-model="editable" /> </a-space>
    <widget-layout :editable="!!editable" class="mb-8" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import WidgetLayout from './WidgetLayout.vue';

@Component({ components: { WidgetLayout } })
export default class WidgetEditor extends Vue {
  editable = true;
}
</script>

<style scoped></style>
