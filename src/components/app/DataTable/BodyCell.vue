<template>
  <td
    ref="bodyCell"
    :tabindex="tabIndex"
    @focusin="focus"
    @focusout="blur"
    class="body-cell"
    v-bind="{ ...$attrs, ...restProps }"
  >
    <slot></slot>
  </td>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Ref } from 'vue-property-decorator';

@Component
export default class HeaderCell extends Vue {
  @Prop({ type: Boolean, default: false }) editable: boolean;

  @Prop({ type: Boolean, default: false }) hasFocus: boolean;

  @Ref('bodyCell') readonly bodyCell!: HTMLTableElement;

  observer: MutationObserver | null = null;

  mounted(): void {
    this.observer = new MutationObserver(() => {
      if (this.hasFocus) {
        if (this.bodyCell?.children) {
          let isFocused = false;
          Array.from(this.bodyCell.children).forEach((child) => {
            if (!isFocused) isFocused = this.focusElement(child);
          });
        }
      }
    });
    this.observer.observe(this.bodyCell, { childList: true });
  }

  focusElement(el: Element): boolean {
    let isFocused = false;
    const element = el as HTMLInputElement;
    if (typeof element.focus === 'function') {
      element.focus();
      isFocused = true;
    }
    let isChildFocused = false;
    if (el?.children) {
      Array.from(el?.children).forEach((child) => {
        if (!isChildFocused) isChildFocused = this.focusElement(child);
      });
    }
    return isFocused || isChildFocused;
  }

  beforeDestroy(): void {
    if (this.observer) this.observer.disconnect();
  }

  @Emit()
  focus(event: unknown): unknown {
    return event;
  }

  @Emit()
  blur(event: unknown): unknown {
    return event;
  }

  get restProps(): Record<string, unknown> {
    const { ...restProps } = this.$props;
    return restProps;
  }

  get tabIndex(): number {
    return this.editable ? 0 : -1;
  }
}
</script>

<style scoped></style>
