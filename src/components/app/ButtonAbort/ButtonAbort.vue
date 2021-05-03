<template>
  <button-base :primary="true" :onClick="onClick">abort</button-base>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { ButtonBase } from '../ButtonBase';

@Component({ components: { ButtonBase } })
export default class ButtonSave extends Vue {
  @Prop({ default: (): Function => () => undefined }) readonly onClick: Function;
}
</script>

<style scoped></style>
