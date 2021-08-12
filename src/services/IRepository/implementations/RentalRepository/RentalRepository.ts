import { injectable } from 'inversify-props';
import { rentalFromApiRental } from '@/mappers';
import type { QueryInterface } from '@/types';
import type { Rental, ApiRental } from '@/models';
import { GenericLegacyRepository } from '../GenericLegacyRepository';

@injectable()
export class RentalRepository extends GenericLegacyRepository<Rental> {
  async list(query?: QueryInterface): Promise<Rental[]> {
    const { filter } = query || { filter: {} };
    const { data: apiRentals } = await this.requestLegacy<{ data: ApiRental[] }>('get', 'IO_Mietobjekt', 'getRentals', {
      ...filter,
      showAll: true,
      sort: 'MietObjektID',
      start: 0,
      limit: 1000,
      dir: 'ASC',
    });
    const rentals: Rental[] = apiRentals.map((rental: ApiRental) => rentalFromApiRental(rental));
    return rentals;
  }

  async delete(_id: string): Promise<Rental> {
    const { success, message } = await this.requestLegacy<{ success: boolean; message: string }>(
      'post',
      'IO_Mietobjekt',
      'delRental',
      {
        confirmed: true,
        id: _id,
      },
    );
    if (!success) throw new Error(message);
    const deletedRental: Partial<Rental> = { _id };
    return deletedRental as Rental;
  }
}
