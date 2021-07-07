<template>
  <a-select
    v-model="selected"
    mode="multiple"
    :placeholder="filter.key"
    :maxTagCount="0"
    showArrow
    class="filter-select"
    :allow-clear="true"
  >
    <a-select-option v-for="option in filter.available" :key="option" :value="option">
      {{ option }}
    </a-select-option>
    <template v-slot:maxTagPlaceholder>
      <span>{{ filter.key }} ({{ selected.length }})</span>
    </template>
  </a-select>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { SelectFilter } from '@/types';

@Component({ components: {} })
export default class Select extends Vue {
  selected: string[] = [];

  @Prop({ required: true, type: Object }) readonly filter: SelectFilter;

  // watch filter selected on global store
  @Watch('filter.selected', { deep: true, immediate: true })
  onGlobalSelectedChange(newSelected: SelectFilter['selected'], oldSelected: SelectFilter['selected'] | undefined) {
    // update local selected model if items in selected list change
    if (JSON.stringify(newSelected) !== JSON.stringify(oldSelected)) {
      this.selected.splice(0, this.selected.length, ...newSelected);
    }
  }

  // watch local selected model
  @Watch('selected', { deep: true, immediate: true })
  onLocalSelectedChange(newSelected: string[]) {
    // commit change on local selected model to store
    this.$store.commit('Dashboards/setFilterSelected', {
      key: this.filter.key,
      selected: [...newSelected],
    });
  }
}
</script>

<style>
.filter-select .ant-select-selection__choice.ant-select-selection__choice__disabled {
  width: 90%;
}
</style>
