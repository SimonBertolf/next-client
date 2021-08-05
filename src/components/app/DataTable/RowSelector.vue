<template>
  <svg height="18" width="18">
    <circle cx="9" cy="9" r="7" stroke="black" stroke-width="1" :fill="fill" @click="click" />
  </svg>
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop } from 'vue-property-decorator';

@Component
export default class RowSelector extends Vue {
  @Prop({ type: Boolean, required: true }) readonly checked: boolean;

  get fill(): string {
    if (this.checked) return '#28304D';
    return 'transparent';
  }

  @Emit()
  click(): unknown {
    return {};
  }
}
</script>

<style scoped>
svg {
  cursor: pointer;
}
</style>
