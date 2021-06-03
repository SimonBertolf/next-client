<template>
  <Card :autoSize="false" :hasTitle="false" :padding="true">
    <span v-if="removable" class="remove" @click="removeWidget"><a-icon type="close" /></span>
    <component :is="type" :id="id"></component>
  </Card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { Card } from '@/components/app';
import { WidgetA, WidgetB, WidgetC } from './widgets';

@Component({ components: { WidgetA, WidgetB, WidgetC, Card } })
export default class Widget extends Vue {
  @Prop({ required: true }) readonly type: string;

  @Prop(String) readonly id: string;

  @Prop({ default: false }) readonly removable: boolean;

  @Emit('remove-widget')
  removeWidget() {
    return this.id;
  }

  // mounted(): void {
  //   console.log('type: ', this.type);
  // }
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
