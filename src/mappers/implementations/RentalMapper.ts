import { SortType } from '@/types';
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

export const sortApiRentalFromRental: ModelMapper<{ [key: string]: SortType }, { sort: string; dir: string }> = (
  sort,
) => {
  let itsSort = {
    sort: 'MietObjektID',
    dir: 'ASC',
  };
  Object.entries(sort).forEach(([key, value]) => {
    let sortProp = '';
    switch (key) {
      case '_id':
        sortProp = 'MietObjektID';
        break;
      case 'nr':
        sortProp = 'MONr';
        break;
      default:
        throw new Error(`sort for ${key} is not implemented.`);
    }
    itsSort = {
      ...itsSort,
      sort: sortProp,
      dir: value === 1 ? 'ASC' : 'DESC',
    };
  });
  return itsSort;
};
