<template>
  <div class="overflow-hidden">
    <a-icon class="text-4xl" type="line-chart" />
    <h3>Widget {{ name }}</h3>
    <p>_id: {{ id }}</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({ components: {} })
export default class WidgetC extends Vue {
  @Prop(String) readonly id: string;

  name = 'C';
}
</script>

<style scoped></style>
