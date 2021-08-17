<template>
  <div class="widget-editor">
    <div class="mb-4 px-2">
      <h2 class="mb-4 font-primary text-2xl">{{ name }}</h2>
      <a-space>
        <span>Edit mode: <a-switch v-model="editable" /></span>
        <a-dropdown v-if="editable">
          <a-menu slot="overlay" @click="addWidget">
            <a-menu-item key="WidgetA"> <a-icon type="dot-chart" />Widget A</a-menu-item>
            <a-menu-item key="WidgetB"> <a-icon type="pie-chart" />Widget B</a-menu-item>
            <a-menu-item key="WidgetC"> <a-icon type="line-chart" />Widget C</a-menu-item>
          </a-menu>
          <a-button class="ml-2"> Add Widget <a-icon type="down" /> </a-button>
        </a-dropdown>
        <!-- <router-link :to="`/reporting/reports/${layoutId}/print`" v-slot="{ href, navigate }" custom>
          <a-button :href="href" @click="navigate">
            Print View
          </a-button>
        </router-link> -->
      </a-space>
    </div>

    <widget-layout
      :editable="!!editable"
      :show-guides="!!editable"
      :new-widget="newWidget"
      @new-widget-added="onNewWidgetAdded"
      class="pb-64"
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

  editable = false;

  newWidget: Widget | null = null;

  get layoutMeta(): LayoutMeta | null {
    return this.$store.state.Layouts.layoutMeta;
  }

  get name(): string | undefined {
    return this.layoutMeta?.displayNames.find((item) => item.lang === 'de')?.text;
  }

  addWidget({ key: type }: { key: WidgetType }): void {
    this.newWidget = { type, _id: `new-${Date.now().toString()}` };
  }

  onNewWidgetAdded(): void {
    this.newWidget = null;
  }
}
</script>

<style scoped></style>
