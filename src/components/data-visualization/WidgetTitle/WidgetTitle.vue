<template>
  <h2 :class="cls">{{ title }}</h2>
</template>

<script lang="ts">
import { Vue, Prop } from 'vue-property-decorator';

export default class WidgetTitle extends Vue {
  @Prop({ required: true, type: String }) readonly title: string;

  @Prop({ default: 'left', type: String }) readonly position: string;

  @Prop({ default: 'dark', type: String }) readonly color: string;

  get cls() {
    return `text-3xl font-bold font-${this.color} text-${this.position}`;
  }
}
</script>

<style></style>
