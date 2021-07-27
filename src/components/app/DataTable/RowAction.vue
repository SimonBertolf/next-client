<template>
  <span>
    <a-dropdown v-if="multiselect" class="dropdown-action" :visible="visible">
      <slot name="title" :onToggle="handleToggle"></slot>
      <a-menu slot="overlay" :selectable="true" v-click-outside="hide">
        <slot></slot>
      </a-menu>
    </a-dropdown>
    <a-dropdown v-else class="dropdown-action" :trigger="['click']">
      <slot name="title"></slot>
      <a-menu slot="overlay" :selectable="true">
        <slot></slot>
      </a-menu>
    </a-dropdown>
  </span>
</template>

<script lang="ts">
// TODO: remove all any's and following comment!
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Vue, Component, Prop } from 'vue-property-decorator';
import ClickOutside from 'vue-click-outside';

@Component({ directives: { ClickOutside } })
export default class RowAction extends Vue {
  @Prop({ type: Boolean, default: false }) multiselect: boolean;

  visible = false;

  hide(): void {
    this.visible = false;
  }

  handleToggle(e: MouseEvent): void {
    this.visible = !this.visible;
    e.stopPropagation();
  }
}
</script>

<style scoped>
.dropdown-action {
  cursor: pointer;
}
</style>
