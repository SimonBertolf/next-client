<template>
  <a-card :body-style="{ display: 'flex', position: 'relative', flexDirection: 'row' }" @click="onClick">
    <slot></slot>
  </a-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class PrimaryListItem extends Vue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Prop({ default: () => () => undefined }) readonly onClick: (...args: any[]) => any;
}
</script>

<style scoped></style>
