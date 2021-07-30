<template>
  <th v-bind="{ ...$attrs, ...restProps }" :class="clsClass">
    <slot></slot>
  </th>
</template>

<script lang="ts">
// TODO: remove all any's and following comment!
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class HeaderCell extends Vue {
  @Prop({ type: String, default: 'primary' }) bg: string;

  @Prop({ type: String, default: 'default' }) type: string;

  @Prop({ type: Boolean, default: false }) isFirst: boolean;

  @Prop({ type: Boolean, default: false }) isLast: boolean;

  @Prop({ type: Boolean, default: false }) hidden: boolean;

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
    if (this.isFirst) return 'header-cell-first';
    return '';
  }

  get lastCellCls(): string {
    if (this.isLast) return 'header-cell-last';
    return '';
  }

  get typeCls(): string {
    let cls = '';
    if (this.type === 'default') {
      cls = `${cls} header-cell-default`;
      if (!this.isLast) cls = `${cls} header-cell-default-border`;
    }
    if (this.type === 'sub') {
      cls = `${cls} header-cell-other`;
      cls = `${cls} header-cell-sub-border`;
    }
    if (this.type === 'summary') {
      cls = `${cls} header-cell-other`;
      cls = `${cls} header-cell-summary header-cell-summary-border`;
      if (this.isFirst) cls = `${cls} header-cell-summary-border-first`;
      if (this.isLast) cls = `${cls} header-cell-summary-border-last`;
    }
    if (this.type === 'action') cls = `${cls} header-cell-action`;
    return cls;
  }

  get clsClass(): string {
    let cls = `header-cell ${this.background} ${this.color}`;
    if (this.firstCellCls) cls = `${cls} ${this.firstCellCls}`;
    if (this.lastCellCls) cls = `${cls} ${this.lastCellCls}`;
    if (this.hidden) cls = `${cls} header-cell-hidden`;
    cls = `${cls} ${this.typeCls}`;
    return cls;
  }
}
</script>

<style scoped>
.header-cell-hidden {
  @apply hidden !important;
}
.header-cell {
  @apply px-2 font-primary whitespace-nowrap !important;
}
.header-cell-bg-primary {
  background-color: #ce423b;
}
.header-cell-bg-secondary {
  background-color: #939393 !important;
}
.header-cell-bg-transparent {
  background-color: transparent !important;
}
.header-cell-text-color-dark {
  @apply text-dark !important;
}
.header-cell-text-color-neutral {
  @apply text-neutral !important;
}
.header-cell-default {
  @apply py-1 !important;
}
.header-cell-other {
  @apply py-2 !important;
}
.header-cell-default-border {
  @apply border-r border-neutral !important;
}
.header-cell-first {
  @apply rounded-tl-md rounded-bl-md !important;
}
.header-cell-last {
  @apply rounded-tr-md rounded-br-md !important;
}
.header-cell-sub-border {
  border-color: #cbcbcb;
  @apply py-2 border-b !important;
}
.header-cell-summary {
  @apply font-bold;
}
.header-cell-summary-border {
  @apply border-dark border-t border-b !important;
}
.header-cell-summary-border-first {
  @apply border-dark border-l !important;
}
.header-cell-summary-border-last {
  @apply border-dark border-r !important;
}
.header-cell-action {
  @apply border-none py-1 !important;
}
</style>
