<template>
  <rental-table-component :rentals="rentals" :loading="loading" :summary="summary" @action="handleAction" />
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
    if (key === 'edit') {
      console.log({ _id });
    }
  }
}
</script>

<style scoped></style>
