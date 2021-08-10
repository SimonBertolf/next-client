import { injectable } from 'inversify-props';
import { rentalFromApiRental } from '@/mappers';
import type { QueryInterface } from '@/types';
import type { Rental, ApiRental } from '@/models';
import { GenericLegacyRepository } from '../GenericLegacyRepository';

@injectable()
export class RentalRepository extends GenericLegacyRepository<Rental> {
  async list(query?: QueryInterface): Promise<Rental[]> {
    const { filter, sort } = query || { filter: {}, sort: {} };
    let itsSort = {
      sort: 'MietObjektID',
      dir: 'ASC',
    };
    if (sort?.nr) {
      itsSort = {
        ...itsSort,
        sort: 'MONr',
        dir: sort.nr === 1 ? 'ASC' : 'DESC',
      };
    }
    if (sort?.property) {
      itsSort = {
        ...itsSort,
        sort: 'MietObjekt',
        dir: sort.property === 1 ? 'ASC' : 'DESC',
      };
    }
    const { data: apiRentals } = await this.requestLegacy<{ data: ApiRental[] }>('get', 'IO_Mietobjekt', 'getRentals', {
      ...filter,
      showAll: true,
      start: 0,
      limit: 1000,
      ...itsSort,
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
    if (!success) throw Error(message);
    const deletedRental: Partial<Rental> = { _id };
    return deletedRental as Rental;
  }
}
