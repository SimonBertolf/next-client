<template>
  <span class="flex flex-col table-sorter-container">
    <a-icon @click="() => sort('asc')" type="caret-up" :style="{ fontSize: '10px' }" :class="ascCls" />
    <a-icon @click="() => sort('desc')" type="caret-down" :style="{ fontSize: '10px' }" :class="descCls" />
  </span>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

@Component
export default class TableSorter extends Vue {
  @Prop({ type: [String, Boolean], default: false }) direction: string | boolean;

  @Emit()
  sort(direction: string): string | boolean {
    if (this.direction === direction) return false;
    return direction;
  }

  get descCls(): string {
    if (this.direction === 'desc') return 'table-sorter-icon-active';
    return 'table-sorter-icon-inactive';
  }

  get ascCls(): string {
    if (this.direction === 'asc') return 'table-sorter-icon-active';
    return 'table-sorter-icon-inactive';
  }
}
</script>

<style scoped>
.table-sorter-container {
  width: 10px;
}
.table-sorter-icon-inactive {
  @apply fill-current text-black text-opacity-40 !important;
}
.table-sorter-icon-active {
  @apply text-white;
}
</style>
