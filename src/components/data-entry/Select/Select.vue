<template>
  <a-select class="w-full" :placeholder="placeholder" v-model="selectedValue">
    <a-select-option v-for="option in options" :key="option.value" :value="option.value">{{
      option.label
    }}</a-select-option>
  </a-select>
</template>

<script lang="ts">
import { Vue, Component, Prop, ModelSync } from 'vue-property-decorator';

@Component
export default class Select extends Vue {
  @Prop(String) readonly placeholder: string;

  @Prop({ type: Array }) readonly options: Array<{ label: string; value: string }>;

  @ModelSync('value', 'select', { type: String })
  readonly selectedValue: string;
}
</script>

<style>
.ant-select-selection {
  @apply shadow rounded-xl;
}

.ant-select-selection__rendered {
  @apply border-r border-common-200 mr-8 !important;
}

.ant-select-selection__placeholder,
.ant-select-arrow {
  @apply text-black !important;
}
</style>
