import { injectable } from 'inversify-props';
import { rentalFromApiRental } from '@/model-mappers';
import { QueryInterface } from '@/types';
import { Rental, ApiRental } from '@/models';
import { GenericLegacyRepository } from '../GenericLegacyRepository';

@injectable()
export class RentalRepository extends GenericLegacyRepository<Rental> {
  async list(query?: QueryInterface): Promise<Rental[]> {
    const { filter } = query || { filter: {} };
    const apiRentals = await this.requestLegacy<ApiRental[]>('get', 'IO_Mietobjekt', 'getRentals', {
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
}
