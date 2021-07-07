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
import { Vue, Component, Prop } from 'vue-property-decorator';
import { SelectFilter } from '@/types';

@Component({ components: {} })
export default class Select extends Vue {
  name = 'Select';

  selected: string[] = [];

  @Prop({ required: true, type: Object }) readonly filter: SelectFilter;

  mounted() {
    this.selected.push(...this.filter.selected);
  }

  // TODO: update state of Dashboards.filters
  // @Watch('selected', { deep: true, immediate: true })
  // onSelectedChange(newVal: string[], oldVal: string[]) {
  //   console.log('old: ', oldVal);
  //   console.log('new: ', newVal);
  // }
}
</script>

<style>
.filter-select .ant-select-selection__choice.ant-select-selection__choice__disabled {
  width: 90%;
}
</style>
