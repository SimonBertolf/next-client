<template>
  <tr ref="headerRow" v-bind="{ ...$attrs, ...restProps }">
    <slot></slot>
  </tr>
</template>

<script lang="ts">
// TODO: remove all any's and following comment!
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class HeaderRow extends Vue {
  $refs!: {
    headerRow: HTMLTableRowElement;
  };

  mounted() {
    const row = this.$refs.headerRow;
    const fixedHeaderWrapper = row.parentElement?.parentElement?.parentElement;
    if (fixedHeaderWrapper?.style.cssText.includes('overflow: scroll')) {
      const additionalCls = 'background-color: transparent !important; margin-right: -17px;';
      if (fixedHeaderWrapper.style) {
        if (fixedHeaderWrapper.style.cssText)
          fixedHeaderWrapper.style.cssText = `${fixedHeaderWrapper?.style.cssText}; ${additionalCls}`;
      }
    }
  }

  get restProps() {
    return this.$props;
  }
}
</script>

<style scoped></style>
