<template>
  <div>
    <h2 :class="Classes">{{ title }}</h2>
  </div>
</template>

<script lang="ts">
import { Vue, Prop } from 'vue-property-decorator';

export default class WidgetTitle extends Vue {
  @Prop({ required: true, type: String }) readonly title: string;

  @Prop({ default: 'left', type: String }) readonly position: string;

  @Prop({ default: 'dark', type: String }) readonly color: string;

  get Classes() {
    return `text-3xl font-bold font-${this.color} text-${this.position}`;
  }
}
</script>

<style></style>
