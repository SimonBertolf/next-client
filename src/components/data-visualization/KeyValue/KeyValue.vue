<template>
  <div>
    <h1 :class="cls">{{ value }} {{ unit }}</h1>
    <p class="text-center truncate">{{ name }}</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({ components: {} })
export default class KeyValue extends Vue {
  @Prop({ required: true, type: String }) readonly value: string;

  @Prop({ required: true, type: String }) readonly name: string;

  @Prop({ default: 'secondary', type: String }) readonly color: string;

  @Prop({ default: '', type: String }) readonly unit: string;

  get cls() {
    return `text-${this.color} text-4xl font-bold text-center truncate`;
  }
}
</script>

<style scoped></style>
