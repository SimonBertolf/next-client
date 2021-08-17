<template>
  <svg height="18" width="18">
    <circle :class="cls" cx="9" cy="9" r="7" stroke="black" stroke-width="1" @click="click" />
  </svg>
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop } from 'vue-property-decorator';

@Component
export default class RowSelector extends Vue {
  @Prop({ type: Boolean, required: true }) readonly checked: boolean;

  get cls(): string {
    if (this.checked) return 'row-selector-circle-checked';
    return 'row-selector-circle-unchecked';
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

.row-selector-circle-unchecked {
  @apply fill-current text-transparent;
}
.row-selector-circle-checked {
  @apply fill-current text-secondary-100;
}
</style>
