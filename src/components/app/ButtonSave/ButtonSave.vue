<template>
  <button-base :onClick="onClick" type="submit">save</button-base>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { ButtonBase } from '../ButtonBase';

@Component({ components: { ButtonBase } })
export default class ButtonSave extends Vue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Prop({ default: () => () => undefined }) readonly onClick!: (...args: any[]) => any;
}
</script>

<style scoped></style>
