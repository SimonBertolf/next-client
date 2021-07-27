<template>
  <div class="w-full" v-if="!loading">
    <rental-table-component
      @row-selection="handleRowSelection"
      @row-action="handleRowAction"
      :rentals="$store.state.Rentals.rentals"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { RentalTableComponent } from '../RentalTableComponent';

@Component({ components: { RentalTableComponent } })
export default class RentalTable extends Vue {
  @Prop(String) assetId: string;

  loading = true;

  mounted(): void {
    this.$store.dispatch('Rentals/loadRentals', this.assetId).then(() => {
      this.loading = false;
    });
  }

  handleRowSelection(): void {
    // console.log(selectedRows);
  }

  handleRowAction(): void {
    // console.log({ key, row });
  }
}
</script>

<style scoped></style>
