<template>
  <a-card :class="cardCls" :body-style="bodyStyle">
    <template v-if="hasTitle" v-slot:title><slot name="title"></slot></template>
    <slot></slot>
    <template v-slot:actions><slot name="actions"></slot></template>
  </a-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Card extends Vue {
  @Prop({ default: false }) readonly autoSize: boolean;

  @Prop({ default: true }) readonly hasTitle: boolean;

  @Prop({ default: true }) readonly padding: boolean;

  get cardCls() {
    let clsClass = this.autoSize ? 'card' : 'card card-full-size';
    if (this.padding) clsClass = `${clsClass} card-padding`;
    return clsClass;
  }

  get bodyStyle() {
    let bodyStyle: { [key: string]: string | number } = {
      flexGrow: 1,
      overflowY: 'auto',
    };
    if (!this.padding) bodyStyle = { ...bodyStyle, padding: 0 };
    return bodyStyle;
  }
}
</script>

<style>
.card {
  @apply bg-neutral shadow-xl rounded-lg flex flex-col;
}
.card-padding {
  @apply p-1;
}
.card-full-size {
  @apply h-full w-full;
}
.ant-card-actions {
  background: white;
}
</style>
