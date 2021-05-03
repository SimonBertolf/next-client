<template>
  <a-card :body-style="{ display: 'flex', position: 'relative', flexDirection: 'row' }" @click="onClick">
    <slot></slot>
  </a-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class PrimaryListItem extends Vue {
  @Prop({ default: () => () => undefined }) readonly onClick: Function;
}
</script>

<style scoped></style>
