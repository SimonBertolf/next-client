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

  get restProps() {
    return this.$props;
  }

  get cls() {
    if (this.type === 'action') return 'body-cell-action';
    return '';
  }
}
</script>

<style scoped>
.body-cell-action {
  @apply border-none !important;
}
</style>
