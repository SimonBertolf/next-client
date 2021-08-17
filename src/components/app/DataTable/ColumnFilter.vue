<template>
  <a-dropdown class="column-filter-menu" :visible="visible">
    <a-icon type="eye" @click="handleClick" :class="cls" />
    <a-menu slot="overlay" v-click-outside="hide">
      <a-menu-item v-for="{ key, label } in options" :key="key">
        <a-checkbox :defaultChecked="true" class="w-full" @change="(event) => filter(event, key)">
          {{ label }}
        </a-checkbox>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import ClickOutside from 'vue-click-outside';

@Component({ directives: { ClickOutside } })
export default class ColumnFilter extends Vue {
  @Prop({ type: Array, required: true }) options: Array<{ key: string; label: string }>;

  visible = false;

  get cls(): string {
    if (this.visible) return 'column-filter-menu-visible';
    return '';
  }

  @Emit()
  filter({ target }: { target: { checked: boolean } }, key: string): { checked: boolean; key: string } {
    const { checked } = target;
    return { checked, key };
  }

  hide(): void {
    this.visible = false;
  }

  handleClick(e: MouseEvent): void {
    this.visible = !this.visible;
    e.stopPropagation();
  }
}
</script>

<style scoped>
.column-filter-menu {
  cursor: pointer;
}
.column-filter-menu-visible {
  @apply text-secondary-100;
}
</style>
