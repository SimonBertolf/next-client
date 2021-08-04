export interface Rental {
  _id: string;
  nr: string;
  rentalType: string;
  tenant: string;
  count: number;
  area: number;
  activeFrom: string;
  activeTo: string;
  marketRent: number;
  netRent: number;
}

export interface ApiRental {
  MietObjektID: string;
  MONr: string;
  MietTyp: string;
  tenant: string;
  Anzahl: number;
  Flaeche: number;
  Beginn: string;
  Ende: string;
  netm2: number;
  marketrent: number;
}
