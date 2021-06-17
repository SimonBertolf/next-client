import { Asset } from '../src/models';

export const assetMock: Asset = {
  id: '9',
  name: 'Damstrasse 7, 8006 Zürich',
};

export const assetsMock: Asset[] = [
  assetMock,
  {
    id: '10',
    name: 'Forststrasse 23, 8006 Zürich',
  },
  {
    id: '11',
    name: 'Giesshübelstrasse 84, 8045 Zürich',
  },
];
