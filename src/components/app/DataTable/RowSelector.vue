<template>
  <svg height="18" width="18">
    <circle cx="9" cy="9" r="7" stroke="black" stroke-width="1" :fill="fill" @click="change" />
  </svg>
</template>

<script lang="ts">
// TODO: remove all any's and following comment!
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Vue, Component, Emit, Prop } from 'vue-property-decorator';

@Component
export default class RowSelector extends Vue {
  @Prop(String) readonly rowKey: string;

  checked = false;

  fill = 'transparent';

  mounted() {
    if (this.checked) {
      this.fill = '#28304D';
    } else {
      this.fill = 'transparent';
    }
  }

  @Emit()
  change() {
    this.checked = !this.checked;
    if (this.checked) {
      this.fill = '#28304D';
    } else {
      this.fill = 'transparent';
    }
    console.log({ fill: this.fill });
    return { checked: this.checked, rowKey: this.rowKey };
  }
}
</script>

<style scoped>
svg {
  cursor: pointer;
}
</style>
