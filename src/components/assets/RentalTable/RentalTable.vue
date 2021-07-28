<template>
  <rental-table-component
    @row-selection="handleRowSelection"
    @row-action="handleRowAction"
    :rentals="rentals"
    :loading="loading"
  />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Rental } from '@/models';
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

  get rentals(): Rental[] {
    return this.$store.state.Rentals.rentals;
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
