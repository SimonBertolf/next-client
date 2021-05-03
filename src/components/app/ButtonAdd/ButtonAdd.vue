<template>
  <button-base :onClick="onClick" :primary="false" icon="plus-circle" size="large"><slot></slot></button-base>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { ButtonBase } from '../ButtonBase';

@Component({ components: { ButtonBase } })
export default class ButtonAdd extends Vue {
  @Prop({ default: (): Function => () => undefined }) readonly onClick: Function;
}
</script>

<style scoped></style>
