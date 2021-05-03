<template>
  <h2 class="text-3xl font-bold font-primary font-dark"><slot></slot></h2>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Title extends Vue {}
</script>

<style scoped></style>
