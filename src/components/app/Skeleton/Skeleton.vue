<template>
  <a-skeleton active :loading="loading"><slot></slot></a-skeleton>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Skeleton extends Vue {
  @Prop(Boolean) readonly loading: boolean;
}
</script>

<style scoped></style>
