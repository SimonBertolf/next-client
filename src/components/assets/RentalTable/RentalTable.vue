<template>
  <div class="w-full">
    <rental-table-component
      :rentals="rentals"
      :loading="loading"
      :summary="summary"
      @action="handleAction"
      @select-rentals="handleSelectRentals"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import type { Rental } from '@/models';
import { RentalTableComponent } from '../RentalTableComponent';

@Component({ components: { RentalTableComponent } })
export default class RentalTable extends Vue {
  @Prop({ type: String, required: true }) assetId: string;

  loading = true;

  mounted(): void {
    this.$store.dispatch('Rentals/loadRentals', this.assetId).then(() => {
      this.loading = false;
    });
  }

  destroyed(): void {
    this.$store.dispatch('Rentals/flushRentals');
  }

  get rentals(): Rental[] {
    return this.$store.state.Rentals.rentals;
  }

  get summary(): Pick<Rental, 'count' | 'area' | 'marketRent' | 'netRent'> {
    const count = this.rentals.reduce((accumulator: number, rental: Rental) => accumulator + rental.count, 0);
    const area = this.rentals.reduce((accumulator: number, rental: Rental) => accumulator + rental.area, 0);
    const marketRent = this.rentals.reduce((accumulator: number, rental: Rental) => accumulator + rental.marketRent, 0);
    const netRent = this.rentals.reduce((accumulator: number, rental: Rental) => accumulator + rental.netRent, 0);
    return { count, area, marketRent, netRent };
  }

  handleAction({ key, _id }: { key: string; _id: string }): void {
    if (key === 'delete') {
      this.deleteRental(_id);
    }
  }

  deleteRental(_id: string): void {
    this.$confirm({
      title: 'Do you want to delete this item?',
      onOk: () => {
        this.$store.dispatch('Rentals/deleteRental', _id).then(() => {
          this.$store.dispatch('Rentals/loadRentals', this.assetId);
        });
      },
    });
  }

  handleSelectRentals(selectedRentals: string[]): void {
    const totalRentals = this.rentals.length;
    const numSelectedRentals = selectedRentals.length;
    this.$message.config({ maxCount: 1 });
    this.$message.info(`Selected Rentals: ${numSelectedRentals}/${totalRentals}`);
  }
}
</script>

<style scoped></style>
