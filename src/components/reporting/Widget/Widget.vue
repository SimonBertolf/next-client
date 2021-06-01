<template>
  <Card :autoSize="false" :hasTitle="false" :padding="true" class="hidden sm:flex">
    <component :is="type" :id="id"></component>
  </Card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Card } from '@/components/app';
import { WidgetA, WidgetB, WidgetC } from './widgets';

@Component({ components: { WidgetA, WidgetB, WidgetC, Card } })
export default class Widget extends Vue {
  @Prop({ required: true }) readonly type: string;

  @Prop(String) readonly id: string;

  // mounted(): void {
  //   console.log('type: ', this.type);
  // }
}
</script>

<style scoped></style>
