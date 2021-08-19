<template>
  <a-spin :spinning="spinning">
    <a-icon slot="indicator" type="loading" class="spinner-icon" spin />
    <slot></slot>
  </a-spin>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Spinner extends Vue {
  @Prop({ default: true, type: Boolean }) readonly spinning: boolean;
}
</script>

<style scoped>
.spinner-icon {
  @apply fill-current text-secondary-100 text-4xl;
}
</style>
