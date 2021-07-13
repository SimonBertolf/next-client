<template>
  <div :class="rootCls" @click="onClose"><slot></slot></div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Overlay extends Vue {
  @Prop({ default: false })
  readonly show: boolean;

  @Prop({ default: false })
  readonly absolute: boolean;

  @Prop({ default: () => undefined })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly onClose: (...args: any[]) => any;

  get rootCls(): string {
    // eslint-disable-next-line max-len
    return `transform transition-all duration-500 ease-in-out bg-dark w-full h-full ${this.displayCls} ${this.absoluteCls}`;
  }

  get absoluteCls(): string {
    return this.absolute ? 'absolute' : 'fixed';
  }

  get displayCls(): string {
    return this.show ? 'bg-opacity-40 z-20' : 'bg-opacity-0 -z-10';
  }
}
</script>

<style scoped></style>
