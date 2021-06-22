import { Asset } from '../src/models';

export const assetMock: Asset = {
  id: '9',
  name: 'Damstrasse 7, 8006 Zürich',
};

export const assetsMock: Asset[] = [
  assetMock,
  {
    id: '16',
    name: 'St. Jakobs-Strasse 25, 8006 Zürich',
  },
  {
    id: '60',
    name: 'Seestrasse 102, 8045 Zürich',
  },
];
