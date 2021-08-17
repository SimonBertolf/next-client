<template>
  <p :class="cls">{{ text }}</p>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({ components: {} })
export default class WidgetText extends Vue {
  @Prop({ required: true, type: String }) readonly text: string;

  @Prop({ default: 'left', type: String }) readonly align: string;

  @Prop({ default: 'dark', type: String }) readonly color: string;

  get cls() {
    return `text-base font-bold text-${this.color} text-${this.align} truncate`;
  }
}
</script>

<style></style>
