<template>
  <a-popconfirm :title="title" :ok-text="yes" :cancel-text="no" @confirm="confirm">
    <slot></slot>
  </a-popconfirm>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class PopUpConfirm extends Vue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Prop() readonly confirm: (...args: any[]) => any;

  @Prop({ default: 'Are you sure' }) readonly title: string;

  @Prop({ default: 'Yes' }) readonly yes: string;

  @Prop({ default: 'No' }) readonly no: string;
}
</script>

<style></style>
