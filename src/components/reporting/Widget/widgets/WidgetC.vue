<template>
  <div>
    <h3>Widget {{ name }}: {{ id }}</h3>
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
