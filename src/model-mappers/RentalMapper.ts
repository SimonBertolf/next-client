import type { ApiRental, Rental } from '@/models';
import type { ModelMapper } from './ModelMapper';

export const rentalFromApiRental: ModelMapper<ApiRental, Rental> = (apiRental: ApiRental): Rental => {
  const { MietObjektID, MONr, MietTyp, tenant, Anzahl, Flaeche, Beginn, Ende, netm2, marketrent } = apiRental;
  return {
    _id: MietObjektID,
    nr: MONr,
    rentalType: MietTyp,
    tenant,
    count: +Anzahl,
    area: +Flaeche,
    activeFrom: Beginn,
    activeTo: Ende,
    marketRent: marketrent,
    netRent: netm2,
  };
};

export const apiRentalFromRental: ModelMapper<Rental, ApiRental> = (rental: Rental): ApiRental => {
  const { _id, nr, rentalType, tenant, count, area, activeFrom, activeTo, marketRent, netRent } = rental;
  return {
    MietObjektID: _id,
    MONr: nr,
    MietTyp: rentalType,
    tenant,
    Anzahl: count,
    Flaeche: area,
    Beginn: activeFrom,
    Ende: activeTo,
    marketrent: marketRent,
    netm2: netRent,
  };
};
