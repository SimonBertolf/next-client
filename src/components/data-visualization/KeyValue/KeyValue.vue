<template>
  <div>
    <span :class="classNames">{{ value }} {{ unit }}</span>
    <span class="text-center truncate">{{ name }}</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({ components: {} })
export default class KeyValue extends Vue {
  @Prop({ required: true, type: String }) readonly value: string;

  @Prop({ required: true, type: String }) readonly name: string;

  @Prop({ default: 'accent-200', type: String }) readonly color: string;

  @Prop({ default: '', type: String }) readonly unit: string;

  get classNames(): string {
    return `text-4xl mb-2 font-bold text-center truncate text-${this.color}`;
  }
}
</script>

<style scoped></style>
