<template>
  <p :class="cls">{{ text }}</p>
</template>

<script lang="ts">
import { Vue, Prop } from 'vue-property-decorator';

export default class WidgetText extends Vue {
  @Prop({ required: true, type: String }) readonly text: string;

  @Prop({ default: 'left', type: String }) readonly position: string;

  get cls() {
    return `text-base font-bold font-dark text-${this.position}`;
  }
}
</script>

<style></style>
