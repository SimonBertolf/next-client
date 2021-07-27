import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { Inject } from 'inversify-props';
import type { IRepository } from '@/services';
import type { Rental } from '@/models';

@Module({ namespaced: true })
export default class Rentals extends VuexModule {
  public rentals: Rental[] = []; // TODO: get assets from repository (or Repository mock)

  @Inject('RentalRepository')
  private rentalRepository: IRepository<Rental>;

  @Mutation
  setRentals(rentals: Rental[]): void {
    this.rentals = rentals;
  }

  @Action
  public async loadRentals(assetId: string): Promise<void> {
    return this.rentalRepository
      .list({ filter: { assetId } })
      .then((rentals: Rental[]) => {
        this.context.commit('setRentals', rentals);
        return Promise.resolve();
      })
      .catch((error) => {
        this.context.commit('Errors/setError', error, { root: true });
        return Promise.reject();
      });
  }
}
