<template>
  <a-form layout="inline" @submit.prevent="onSubmit"><slot></slot></a-form>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class FormInline extends Vue {
  @Prop(Function) readonly onSubmit: Function;
}
</script>

<style scoped></style>
