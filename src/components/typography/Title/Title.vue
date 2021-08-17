<template>
  <h2 class="text-3xl font-bold font-primary text-black"><slot></slot></h2>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Title extends Vue {}
</script>

<style scoped></style>
