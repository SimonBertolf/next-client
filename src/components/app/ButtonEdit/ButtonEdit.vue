<template>
  <a-button class="button-edit" shape="circle" icon="edit" @click="onClick" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class ButtonEdit extends Vue {
  @Prop({ required: true }) readonly onClick: Function;
}
</script>

<style scoped>
.button-edit {
  @apply focus:border-start
        focus:text-start
        hover:border-start
        hover:text-start;
}
</style>
