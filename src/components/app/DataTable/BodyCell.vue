<template>
  <td v-bind="{ ...$attrs, ...restProps }" :class="cls">
    <slot></slot>
  </td>
</template>

<script lang="ts">
// TODO: remove all any's and following comment!
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class BodyCell extends Vue {
  @Prop(String) readonly type: string;

  @Prop({ type: Boolean, default: false }) readonly hidden: boolean;

  get restProps(): Record<string, unknown> {
    return this.$props;
  }

  get cls(): string {
    if (this.type === 'action') return 'body-cell-action';
    if (this.hidden) return 'body-cell-hidden';
    return '';
  }
}
</script>

<style scoped>
.body-cell-hidden {
  @apply hidden !important;
}
.body-cell-action {
  @apply border-none !important;
}
</style>
