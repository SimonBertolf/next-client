<template>
  <h2 :class="cls">{{ title }}</h2>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({ components: {} })
export default class WidgetTitle extends Vue {
  @Prop({ required: true, type: String }) readonly title: string;

  @Prop({ default: 'left', type: String }) readonly align: string;

  @Prop({ default: 'dark', type: String }) readonly color: string;

  get cls() {
    return `text-3xl font-bold text-${this.color} text-${this.align} truncate`;
  }
}
</script>

<style></style>
