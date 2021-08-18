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

  @Prop({ default: 'accent', type: String }) readonly color: string;

  @Prop({ default: '', type: String }) readonly unit: string;

  res = 'text-4xl font-bold text-center truncate';

  get cls() {
    if( this.color === 'accent') this.res = `${this.res} text-accent-200`;

    return this.res;
  }
}
</script>

<style scoped></style>
