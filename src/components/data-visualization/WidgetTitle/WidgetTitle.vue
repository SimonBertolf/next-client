<template>
  <h3 :class="cls">{{ title }}</h3>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { ColorType } from '@/types/ColorType';

@Component({ components: {} })
export default class WidgetTitle extends Vue {
  @Prop({ required: true, type: String }) readonly title: string;

  @Prop({ default: 'left', type: String }) readonly align: string;

  @Prop() readonly color: ColorType | undefined;

  get cls() {
    if (this.color) return `text-3xl font-bold text-${this.color} text-${this.align} truncate`;
    return `text-3xl font-bold text-${this.align} truncate`;
  }
}
</script>

<style></style>
