<template>
  <div>
    <h3>Widget {{ name }}: {{ id }}</h3>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({ components: {} })
export default class WidgetA extends Vue {
  @Prop(String) readonly id: string;

  name = 'A';
}
</script>

<style scoped></style>
