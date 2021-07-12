<template>
  <div class="widget-editor">
    <div class="mb-4 px-2">
      <h2 class="mb-4 text-2xl">{{ name }}</h2>
      <a-space>
        <span>Editable: <a-switch default-checked v-model="editable" /></span>
        <a-dropdown v-if="editable">
          <a-menu slot="overlay" @click="addWidget">
            <a-menu-item key="WidgetA"> <a-icon type="dot-chart" />Widget A</a-menu-item>
            <a-menu-item key="WidgetB"> <a-icon type="pie-chart" />Widget B</a-menu-item>
            <a-menu-item key="WidgetC"> <a-icon type="line-chart" />Widget C</a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px;"> Add Widget <a-icon type="down" /> </a-button>
        </a-dropdown>
        <router-link :to="`/reporting/reports/${layoutId}/print`" v-slot="{ href, navigate }" custom>
          <a-button :href="href" @click="navigate">
            Print View
          </a-button>
        </router-link>
      </a-space>
    </div>

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
import { LayoutMeta } from '@/models';
import { WidgetType, Widget } from '@/types';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { WidgetLayout } from '@/components/app';

@Component({ components: { WidgetLayout } })
export default class WidgetEditor extends Vue {
  @Prop(String) readonly layoutId: string;

  editable = true;

  newWidget: Widget | null = null;

  get layoutMeta(): LayoutMeta | null {
    return this.$store.state.Layouts.layoutMeta;
  }

  get name(): string | undefined {
    return this.layoutMeta?.name;
  }

  addWidget({ key: type }: { key: WidgetType }) {
    this.newWidget = { type, _id: Date.now().toString() };
  }

  onNewWidgetAdded() {
    this.newWidget = null;
  }
}
</script>

<style scoped></style>
