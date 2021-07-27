<template>
  <Card :autoSize="false" :hasTitle="false" :padding="true">
    <spinner :spinning="loading">
      <div>
        <span v-if="removable" class="remove" @click="removeWidget"><a-icon type="close" /></span>
        <component :is="type" :id="id" :widget-data="widgetData"></component>
      </div>
    </spinner>
  </Card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { Card, Spinner } from '@/components/app';
import { WidgetData, Widget as WidgetInterface, WidgetType } from '@/types';
import { Report } from '@/models';
import { WidgetA, WidgetB, WidgetC } from './widgets';

@Component({ components: { WidgetA, WidgetB, WidgetC, Card, Spinner } })
export default class Widget extends Vue {
  @Prop({ required: true }) readonly type: string;

  @Prop(String) readonly id: string;

  @Prop({ default: false }) readonly removable: boolean;

  get loading(): boolean {
    return !this.$store.state.Widgets.widgets.find((widgetData: WidgetData) => widgetData.widget === this.id);
  }

  get widgetData(): WidgetData['data'] | undefined {
    return this.$store.state.Widgets.widgets.find((widgetData: WidgetData) => widgetData.widget === this.id)?.data;
  }

  @Emit('remove-widget')
  removeWidget(): string {
    return this.id;
  }

  mounted(): void {
    // initial loading of widget data
    const widget: WidgetInterface = { _id: this.id, type: this.type as WidgetType };
    const { report }: { report: Report | null } = this.$store.state.Reports;
    this.$store.dispatch('Widgets/loadWidgetData', { widget, report: report || undefined });
  }
}
</script>

<style scoped>
.remove {
  position: absolute;
  right: 5px;
  font-size: 10px;
  top: 4px;
  color: #a3a3a3;
  cursor: pointer;
}
</style>
