<template>
  <h4 :class="classNames">{{ title }}</h4>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({ components: {} })
export default class WidgetTitle extends Vue {
  @Prop({ required: true, type: String }) readonly title: string;

  @Prop({ default: 'left', type: String }) readonly align: 'left' | 'right' | 'center';

  get classNames(): string {
    return `text-xl font-bold mb-1 truncate text-${this.align}`;
  }
}
</script>

<style></style>
