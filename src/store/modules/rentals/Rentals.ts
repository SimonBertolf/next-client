import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { Inject } from 'inversify-props';
import type { IRepository } from '@/services';
import type { QueryInterface } from '@/types';
import type { Rental } from '@/models';

@Module({ namespaced: true })
export default class Rentals extends VuexModule {
  public rentals: Rental[] = [];

  @Inject('RentalRepository')
  private rentalRepository: IRepository<Rental>;

  @Mutation
  setRentals(rentals: Rental[]): void {
    this.rentals = rentals;
  }

  @Action
  public async loadRentals(query: QueryInterface): Promise<void> {
    return this.rentalRepository
      .list({ ...query })
      .then((rentals: Rental[]) => {
        this.context.commit('setRentals', rentals);
      })
      .catch((error) => {
        this.context.commit('Errors/setError', error, { root: true });
      });
  }

  @Action async deleteRental(_id: string): Promise<void> {
    try {
      await this.rentalRepository.delete(_id);
      const rentals = this.rentals.filter((rental) => rental._id !== _id);
      this.context.commit('setRentals', rentals);
    } catch (error) {
      this.context.commit('Errors/setError', error, { root: true });
      throw new Error(error);
    }
  }

  @Action
  public flushRentals(): void {
    this.context.commit('setRentals', []);
  }
}
