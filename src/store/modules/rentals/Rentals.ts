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
  public async loadRentals({ assetId, query }: { assetId: string; query?: QueryInterface }): Promise<void> {
    let itsQuery: QueryInterface = { filter: { assetId } };
    if (query?.sort) {
      itsQuery = {
        ...itsQuery,
        sort: { ...query.sort },
      };
    }
    return this.rentalRepository
      .list({ ...itsQuery })
      .then((rentals: Rental[]) => {
        this.context.commit('setRentals', rentals);
      })
      .catch((error) => {
        this.context.commit('Errors/setError', error, { root: true });
      });
  }

  @Action async deleteRental(_id: string): Promise<void> {
    return this.rentalRepository
      .delete(_id)
      .then(async () => {
        console.log({ asset: this.context.rootState.Assets.asset });
        await this.context.dispatch('loadRentals', { assetId: this.context.rootState.Assets.asset.id });
      })
      .catch((error) => {
        this.context.commit('Errors/setError', error, { root: true });
      });
  }

  @Action
  public flushRentals(): void {
    this.context.commit('setRentals', []);
  }
}
