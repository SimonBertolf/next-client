<template>
  <strong class="font-primary text-black"><slot></slot></strong>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class HighlightSmall extends Vue {}
</script>

<style scoped></style>
