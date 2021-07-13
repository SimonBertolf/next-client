<template>
  <a-form-item>
    <a-input :placeholder="label" :value="value" @change="onChange" :id="id"></a-input>
  </a-form-item>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class FormInput extends Vue {
  @Prop(String) readonly label: string;

  @Prop([String, Number]) value: string | number;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Prop(Function) readonly onChange: (...args: any[]) => any;

  @Prop({ default: undefined }) id: string | undefined;
}
</script>

<style scoped></style>
