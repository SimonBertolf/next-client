<template>
  <fade-transition>
    <slot></slot>
  </fade-transition>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { FadeTransition } from 'vue2-transitions';

@Component({ components: { FadeTransition } })
export default class Fade extends Vue {}
</script>

<style scoped></style>
