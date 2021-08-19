<template>
  <span :class="classNames">{{ text }}</span>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({ components: {} })
export default class WidgetText extends Vue {
  @Prop({ required: true, type: String }) readonly text: string;

  @Prop({ default: 'left', type: String }) readonly align: 'left' | 'right' | 'center';

  get classNames(): string {
    return `text-sm truncate text-${this.align}`;
  }
}
</script>

<style></style>
