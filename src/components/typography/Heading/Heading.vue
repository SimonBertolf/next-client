<template>
  <h1 class="font-primary text-3xl font-light text-center">
    <slot></slot>
  </h1>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Heading extends Vue {}
</script>

<style scoped></style>
