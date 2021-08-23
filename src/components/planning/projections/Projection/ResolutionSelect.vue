<template>
  <div>
    Resolution
    <a-select :default-value="resolution" style="width: 120px" @change="onSelect">
      <a-select-option value="yearly">Years</a-select-option>
      <a-select-option value="quarterly">Quarters</a-select-option>
      <a-select-option value="monthly">Months</a-select-option>
    </a-select>
  </div>
</template>

<script lang="ts">
import type { Resolution } from '@/models';
import { Vue, Component, Emit } from 'vue-property-decorator';

@Component({ components: {} })
export default class ResulutionSelect extends Vue {
  @Emit()
  onSelect(val: Resolution): void {
    this.$store.dispatch('Projections/setResolution', val);
  }

  get resolution(): Resolution {
    return this.$store.state.Projections.projectionMeta?.resolution;
  }
}
</script>

<style scoped></style>
