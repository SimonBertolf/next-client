<template>
  <th v-bind="{ ...$attrs, ...restProps }" :class="clsClass">
    <span class="w-full flex flex-noWrap justify-between">
      <slot></slot>
      <span v-if="sorter" class="self-end pl-2">
        <table-sorter :direction="direction" @sort="onSort" />
      </span>
    </span>
  </th>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { TableColumnTypes } from '@/types';
import TableSorter from './TableSorter.vue';

@Component({ components: { TableSorter } })
export default class HeaderCell extends Vue {
  @Prop({ type: String, default: 'primary' }) bg: string;

  @Prop({ type: String, default: 'default' }) type: string;

  @Prop({ type: Boolean, default: false }) isFirst: boolean;

  @Prop({ type: Boolean, default: false }) isLast: boolean;

  @Prop({ type: Boolean, default: false }) sorter: boolean;

  @Prop({ type: [String, Boolean], default: false }) direction: string | boolean;

  @Prop({ default: () => () => undefined }) onSort: (direction: boolean | string) => void;

  get restProps(): Record<string, unknown> {
    const { ...restProps } = this.$props;
    return restProps;
  }

  get background(): string {
    let bg = '';
    if (this.bg === 'primary') bg = 'header-cell-bg-primary';
    if (this.bg === 'secondary') bg = 'header-cell-bg-secondary';
    if (this.bg === 'transparent') bg = 'header-cell-bg-transparent';
    return bg;
  }

  get color(): string {
    if (this.bg === 'transparent') return 'header-cell-text-color-dark';
    return 'header-cell-text-color-neutral';
  }

  get firstCellCls(): string {
    if (this.isFirst && this.type !== TableColumnTypes.UNIT) return 'header-cell-first';
    return '';
  }

  get lastCellCls(): string {
    if (this.isLast && this.type !== TableColumnTypes.UNIT) return 'header-cell-last';
    return '';
  }

  get typeCls(): string {
    let cls = '';
    if (this.type === TableColumnTypes.DEFAULT) {
      cls = `${cls} header-cell-default`;
      if (!this.isLast) cls = `${cls} header-cell-default-border`;
    }
    if (this.type === TableColumnTypes.UNIT) {
      cls = `${cls} header-cell-other`;
      cls = `${cls} header-cell-unit-border`;
    }
    if (this.type === TableColumnTypes.SUMMARY) {
      cls = `${cls} header-cell-other`;
      cls = `${cls} header-cell-summary header-cell-summary-border`;
      if (this.isFirst) cls = `${cls} header-cell-summary-border-first`;
      if (this.isLast) cls = `${cls} header-cell-summary-border-last`;
    }
    return cls;
  }

  get clsClass(): string {
    let cls = `header-cell ${this.background} ${this.color}`;
    if (this.firstCellCls) cls = `${cls} ${this.firstCellCls}`;
    if (this.lastCellCls) cls = `${cls} ${this.lastCellCls}`;
    cls = `${cls} ${this.typeCls}`;
    return cls;
  }
}
</script>

<style scoped>
.header-cell {
  @apply px-2 font-primary whitespace-nowrap !important;
}
.header-cell-bg-primary {
  @apply bg-primary-200;
}
.header-cell-bg-secondary {
  @apply bg-common-100;
}
.header-cell-bg-transparent {
  @apply bg-transparent;
}
.header-cell-text-color-dark {
  @apply text-black !important;
}
.header-cell-text-color-neutral {
  @apply text-white !important;
}
.header-cell-default {
  @apply py-1 !important;
}
.header-cell-other {
  @apply py-2 !important;
}
.header-cell-default-border {
  @apply border-r border-white !important;
}
.header-cell-first {
  @apply rounded-tl-md rounded-bl-md !important;
}
.header-cell-last {
  @apply rounded-tr-md rounded-br-md !important;
}
.header-cell-unit-border {
  @apply py-2 border-b border-common-400 !important;
}
.header-cell-summary {
  @apply font-bold;
}
.header-cell-summary-border {
  @apply border-black border-t border-b !important;
}
.header-cell-summary-border-first {
  @apply border-black border-l !important;
}
.header-cell-summary-border-last {
  @apply border-black border-r !important;
}
</style>
