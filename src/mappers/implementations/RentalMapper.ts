import type { ApiRental, Rental } from '@/models';
import type { ModelMapper } from '../interfaces/ModelMapper';

export const rentalFromApiRental: ModelMapper<ApiRental, Rental> = (apiRental) => {
  const {
    MietObjektID,
    MONr,
    MietObjekt,
    MietTyp,
    tenant,
    Anzahl,
    Flaeche,
    Beginn,
    Ende,
    netm2,
    marketrent,
  } = apiRental;
  return {
    _id: MietObjektID,
    nr: MONr,
    property: MietObjekt,
    rentalType: MietTyp,
    tenant,
    count: +Anzahl,
    area: +Flaeche,
    activeFrom: Beginn,
    activeTo: Ende,
    marketRent: +marketrent,
    netRent: +netm2,
  };
};

export const apiRentalFromRental: ModelMapper<Rental, ApiRental> = (rental) => {
  const { _id, nr, property, rentalType, tenant, count, area, activeFrom, activeTo, marketRent, netRent } = rental;
  return {
    MietObjektID: _id,
    MONr: nr,
    MietObjekt: property,
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
