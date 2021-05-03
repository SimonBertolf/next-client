<template>
  <router-link :to="getTo"><slot></slot></router-link>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class RouteLocalized extends Vue {
  @Prop({ required: true }) readonly to: string;

  get getTo(): string {
    return this.to;
  }
}
</script>

<style scoped></style>
