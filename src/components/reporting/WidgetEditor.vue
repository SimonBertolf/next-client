<template>
  <div class="widget-editor">
    <a-space class="mb-4 mx-4">
      <span>Editable: <a-switch default-checked v-model="editable" /></span>
      <a-dropdown v-if="editable">
        <a-menu slot="overlay" @click="addWidget">
          <a-menu-item key="WidgetA"> <a-icon type="dot-chart" />Widget A</a-menu-item>
          <a-menu-item key="WidgetB"> <a-icon type="pie-chart" />Widget B</a-menu-item>
          <a-menu-item key="WidgetC"> <a-icon type="line-chart" />Widget C</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px;"> Add Widget <a-icon type="down" /> </a-button>
      </a-dropdown>
      <router-link to="/reports/asdf1234/print" v-slot="{ href, navigate }" custom>
        <a-button :href="href" @click="navigate">
          Print View
        </a-button>
      </router-link>
    </a-space>
    <widget-layout
      :editable="!!editable"
      :show-guides="!!editable"
      :new-widget="newWidget"
      @new-widget-added="onNewWidgetAdded"
      class="mb-8"
    />
  </div>
</template>

<script lang="ts">
import { WidgetData, WidgetType } from '@/types';
import { Vue, Component } from 'vue-property-decorator';
import WidgetLayout from './WidgetLayout.vue';

@Component({ components: { WidgetLayout } })
export default class WidgetEditor extends Vue {
  editable = true;

  newWidget: WidgetData | null = null;

  addWidget({ key: type }: { key: WidgetType }) {
    this.newWidget = { type, _id: Date.now().toString() };
  }

  onNewWidgetAdded() {
    this.newWidget = null;
  }
}
</script>

<style scoped></style>
