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

export const sortApiRentalFromSortRental: ModelMapper<{ [key: string]: SortType }, { sort?: string; dir?: string }> = (
  sort,
) => {
  const sortKeys = Object.keys(sort);
  if (!sortKeys.length) return {};
  if (sortKeys.length > 1) throw new Error('Multi dimension sorting is not supported');
  const key = sortKeys[0];
  const dir = sort[key] === 1 ? 'ASC' : 'DESC';
  switch (key) {
    case '_id':
      return {
        sort: 'MietObjektID',
        dir,
      };
    case 'nr':
      return {
        sort: 'MONr',
        dir,
      };
    case 'property':
      return {
        sort: 'MietObjekt',
        dir,
      };
    case 'rentalType':
      return {
        sort: 'MietTyp',
        dir,
      };
    case 'tenant':
      return {
        sort: 'tenant',
        dir,
      };
    case 'count':
      return {
        sort: 'Anzahl',
        dir,
      };
    case 'area':
      return {
        sort: 'Flaeche',
        dir,
      };
    case 'activeFrom':
      return {
        sort: 'Beginn',
        dir,
      };
    case 'activeTo':
      return {
        sort: 'Ende',
        dir,
      };
    case 'marketRent':
      return {
        sort: 'marketrent',
        dir,
      };
    case 'netRent':
      return {
        sort: 'netm2',
        dir,
      };
    default:
      throw new Error(`sort for ${key} is not implemented.`);
  }
};
