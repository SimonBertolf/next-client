import { injectable } from 'inversify-props';
import { QueryInterface } from '@/types';
import { Rental, ApiRental } from '@/models';
import { GenericRepository } from '../GenericRepository';

@injectable()
export class RentalRepository extends GenericRepository<Rental> {
  constructor() {
    super('/legacy');
  }

  async list(query?: QueryInterface): Promise<Rental[]> {
    const { filter } = query || { filter: {} };
    const response = await this.client.get(`${this.api}/server?module=IO_Mietobjekt&action=getRentals`, {
      params: {
        ...filter,
        showAll: true,
        sort: 'MietObjektID',
        start: 0,
        limit: 1000,
        dir: 'ASC',
      },
    });
    const { data } = response;
    const { data: apiRentals } = data.data;
    const rentals: Rental[] = apiRentals.map((rental: ApiRental) => {
      const { MietObjektID, MONr, MietTyp, tenant, Anzahl, Flaeche, Beginn, Ende, netm2, marketrent } = rental;
      return {
        _id: MietObjektID,
        nr: MONr,
        rentalType: MietTyp,
        tenant,
        count: Anzahl,
        area: Flaeche,
        activeFrom: Beginn,
        activeTo: Ende,
        marketRent: marketrent,
        netRent: netm2,
      };
    });
    return rentals;
  }
}
