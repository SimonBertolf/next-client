<template>
  <div>
    <!-- TODO: disable save button when widget data is not ready -->
    <a-button
      class="disabled:opacity-50 px-0 border-0 bg-transparent hover:bg-transparent focus:bg-transparent shadow-none"
      @click="openSaveDialogue"
    >
      <a-icon type="save" theme="outlined" class="text-4xl" />
    </a-button>
    <a-modal title="Save dashboard as report" v-model="modalVisible" class="dashboard-save-modal">
      <template slot="footer" class="px-4">
        <a-button key="submit" type="primary" :loading="loading" @click="handleSave" :disabled="disabled">
          Save
        </a-button>
      </template>
      <a-form>
        <a-form-item>
          <a-input v-model="name" placeholder="Name" />
        </a-form-item>
        <a-form-item class="mb-0">
          <a-input v-model="description" placeholder="Beschreibung (optional)" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Report } from '@/models';

@Component({ components: {} })
export default class DashboardSaveButton extends Vue {
  modalVisible = false;

  name = '';

  description = '';

  get layoutId(): string {
    return this.$store.state.Layouts.layoutMeta?._id;
  }

  get loading(): boolean {
    return this.$store.state.Reports.loading?.newReport;
  }

  get disabled(): boolean {
    return !this.name.length;
  }

  openSaveDialogue(): void {
    this.modalVisible = true;
  }

  handleSave(): void {
    this.$store
      .dispatch('Reports/newReport', {
        name: this.name,
        description: this.description.length ? this.description : undefined,
        layoutId: this.layoutId,
        widgetsData: this.$store.state.Widgets.widgets,
      })
      .then((report: Report) => {
        if (report) this.$router.push(`/reporting/reports/${report._id}`);
      });
  }
}
</script>

<style>
.dashboard-save-modal .ant-modal-footer {
  @apply px-6;
}
</style>
