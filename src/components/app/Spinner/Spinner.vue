<template>
  <a-spin :spinning="spinning">
    <a-icon slot="indicator" type="loading" style="font-size: 24px; color: #252d48" spin />
    <slot></slot>
  </a-spin>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({ components: {} })
export default class Spinner extends Vue {
  @Prop({ default: true, type: Boolean }) readonly spinning: boolean;

  name = 'Spinner';
}
</script>

<style scoped></style>
