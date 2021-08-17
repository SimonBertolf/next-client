<template>
  <div class="text-3xl font-light text-black font-primary"><slot></slot></div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class TitleLight extends Vue {}
</script>

<style scoped></style>
