<template>
  <a-button class="custom-button" type="ghost" block @click="onAction">
    <a-icon type="edit" />
  </a-button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class TableActionButton extends Vue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Prop({ type: Function, default: () => () => undefined }) onAction: (...args: any[]) => any;
}
</script>

<style>
[ant-click-animating-without-extra-node='true']::after,
.ant-click-animating-node::after,
.ant-click-animating-node {
  @apply shadow-none hidden !important;
}

.custom-button {
  @apply text-black hover:text-black focus:text-black active:text-black !important;
  @apply border-0 border-common-200 shadow-none px-1 ring-0 transition-none h-full !important;
}
</style>
