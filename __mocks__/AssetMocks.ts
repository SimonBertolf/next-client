import { Asset } from '../src/models';

export const assetMock: Asset = {
  id: '60c9cbd35f6db188c6441116',
  name: 'Lindenbachstrasse 40, 8006 Zürich',
};

export const assetsMock: Asset[] = [
  assetMock,
  {
    id: '60c9cbdd5d40b57b5c5cd5b1',
    name: 'Forststrasse 23, 8006 Zürich',
  },
  {
    id: '60c9cbe2b62587d676cf5c1e',
    name: 'Giesshübelstrasse 84, 8045 Zürich',
  },
];
