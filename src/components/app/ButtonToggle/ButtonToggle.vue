<template>
  <button style="height: 3.125rem;" @click="onToggle" :class="buttonCls">
    <span :class="rootCls">
      <a-icon type="right" :style="{ color: '#9CA3AF' }" />
    </span>
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class ButtonToggle extends Vue {
  @Prop({ default: false })
  readonly open: boolean;

  @Prop({ default: () => undefined })
  readonly onToggle: Function;

  // eslint-disable-next-line class-methods-use-this
  get buttonCls(): string {
    // eslint-disable-next-line max-len
    return `transform transition-all duration-200 ease-in-out p-1 hover:pl-3 bg-neutral bg-opacity-80 w-6 hover:w-8 outline-none focus:outline-none self-center z-20 fixed flex flex-nowrap ${this.buttonOpenCls}`;
  }

  get rootCls(): string {
    return `flex inline-block transform transition-all duration-200 ease-in-out self-center ${this.openCls}`;
  }

  get openCls(): string {
    return this.open ? 'rotate-180' : 'rotate-0';
  }

  get buttonOpenCls(): string {
    return this.open ? 'translate-x-48' : 'translate-x-0';
  }
}
</script>

<style scoped></style>
