<template>
  <a-button
    class="disabled:opacity-50 px-0 border-0 bg-transparent hover:bg-transparent focus:bg-transparent shadow-none"
    @click="openPdfInNewTab"
    :loading="loading"
  >
    <a-icon type="file-pdf" theme="outlined" class="text-4xl" />
  </a-button>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({ components: {} })
export default class ReportPdfButton extends Vue {
  openPdfInNewTab(): void {
    this.$store.dispatch('Reports/loadPdf');
  }

  get loading(): boolean {
    return this.$store.state.Reports.loading.pdf;
  }
}
</script>

<style scoped></style>
