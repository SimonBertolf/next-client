<template>
  <a-dropdown :trigger="['click']" class="row-action-menu">
    <a-icon type="more" :rotate="90" />
    <a-menu slot="overlay" @click="click">
      <a-menu-item v-for="{ key, label } in options" :key="key">{{ label }}</a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

@Component
export default class RowActionMenu extends Vue {
  @Prop({ type: Array, default: [] }) options: Array<{ key: string; label: string }>;

  @Emit()
  click({ key }: { key: string }): { key: string } {
    return { key };
  }
}
</script>

<style scoped>
.row-action-menu {
  cursor: pointer;
}
</style>
