<template>
  <a-select
    v-model="selected"
    mode="multiple"
    :placeholder="placeholder"
    :maxTagCount="0"
    class="filter-select"
    allow-clear
  >
    <a-select-option v-for="option in filter.options" :key="option" :value="option">
      {{ option }}
    </a-select-option>
    <template v-slot:maxTagPlaceholder>
      <span>{{ filter.key }} ({{ selected.length }})</span>
    </template>
  </a-select>
</template>

<script lang="ts">
import { isEqual } from 'lodash';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import type { SelectFilter, FilterSelection } from '@/types';

@Component({ components: {} })
export default class Select extends Vue {
  selected: string[] = [];

  @Prop({ required: true, type: Object }) readonly filter: SelectFilter;

  @Prop({ required: true, type: Number }) readonly filterIndex: number;

  @Prop({ required: true, type: Array }) readonly filterSelection: FilterSelection;

  get placeholder(): string {
    // TODO: set lang automatically from i18n store
    return this.filter.displayNames.find((item) => item.lang === 'de')?.text || `t('${this.filter.key}')`;
  }

  // watch filter selected on global store
  @Watch('filterSelection', { deep: true, immediate: true })
  onGlobalSelectedChange(): void {
    // update local selected if different from global selected
    if (!isEqual(this.filterSelection, this.selected)) {
      const selectedUpdate = [...this.filterSelection];
      this.selected.splice(0, this.selected.length, ...selectedUpdate);
    }
  }

  // watch local selected model
  @Watch('selected', { deep: true, immediate: true })
  onLocalSelectedChange(): void {
    // update global selected if different from local
    if (!isEqual(this.filterSelection, this.selected)) {
      this.$store.commit('Dashboards/setFilterSelection', {
        key: this.filter.key,
        selection: [...this.selected],
      });
    }
  }
}
</script>

<style>
.filter-select .ant-select-selection__choice.ant-select-selection__choice__disabled {
  width: 90%;
}
</style>
