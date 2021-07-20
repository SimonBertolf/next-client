<template>
  <a-dropdown class="dropdown-action" :trigger="['click']" @select="select">
    <slot name="title"></slot>
    <a-menu slot="overlay">
      <slot></slot>
    </a-menu>
  </a-dropdown>
</template>

<script lang="ts">
// TODO: remove all any's and following comment!
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Vue, Component, Emit } from 'vue-property-decorator';

@Component
export default class RowAction extends Vue {
  @Emit()
  select(...args: Array<unknown>) {
    const key = args[1] as string;
    const selectedKeys = args[2] as string[];
    return { key, selectedKeys };
  }
}
</script>

<style scoped>
.dropdown-action {
  cursor: pointer;
}
</style>
