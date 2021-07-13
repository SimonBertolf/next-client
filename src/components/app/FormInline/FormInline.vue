<template>
  <a-form layout="inline" @submit.prevent="onSubmit"><slot></slot></a-form>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class FormInline extends Vue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Prop(Function) readonly onSubmit: (...args: any[]) => any;
}
</script>

<style scoped></style>
