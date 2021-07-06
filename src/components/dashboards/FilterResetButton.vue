<template>
  <button-base :primary="true" :on-click="onClick" icon="delete">Reset Filters</button-base>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { ButtonBase } from '@/components/app';

@Component({ components: { ButtonBase } })
export default class FilterResetButton extends Vue {
  onClick() {
    // TODO: implement state update
    // console.log('reset filters');
  }
}
</script>

<style scoped></style>
