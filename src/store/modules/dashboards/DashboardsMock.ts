import { Dashboard } from '@/models';
import { Filter } from '@/types';
import { apiLayoutsMock } from '../layouts/LayoutsMock';

export const filtersMock: Filter[] = [
  {
    key: 'period',
    type: 'DateRange',
    displayNames: [{ lang: 'de', text: 'Zeitraum' }],
    options: { from: new Date('2012-01-06T13:21:33+000Z'), to: new Date('2021-07-06T13:21:33+000Z') },
  },
  {
    key: 'clients',
    type: 'Select',
    displayNames: [{ lang: 'de', text: 'Mandanten' }],
    options: ['01', '02', '03'],
  },
  {
    key: 'portfolios',
    type: 'Select',
    displayNames: [{ lang: 'de', text: 'Portfolios' }],
    options: ['01', '02', '03'],
  },
  {
    key: 'regions',
    type: 'Select',
    displayNames: [{ lang: 'de', text: 'Regionen' }],
    options: ['01', '02', '03'],
  },
  {
    key: 'assets',
    type: 'Select',
    displayNames: [{ lang: 'de', text: 'Liegenschaften' }],
    options: ['01', '02', '03'],
  },
  {
    key: 'usages',
    type: 'Select',
    displayNames: [{ lang: 'de', text: 'Nutzungsgruppen' }],
    options: ['01', '02', '03'],
  },
  {
    key: 'kinds',
    type: 'Select',
    displayNames: [{ lang: 'de', text: 'Nutzungsarten' }],
    options: ['01', '02', '03'],
  },
  {
    key: 'tanants',
    type: 'Select',
    displayNames: [{ lang: 'de', text: 'Mieter' }],
    options: ['01', '02', '03'],
  },
];

export const dashboardsMock: Dashboard[] = [
  {
    name: 'Übersicht',
    displayNames: [
      {
        lang: 'de',
        text: 'Übersicht',
      },
    ],
    _id: '60c717880e671f91b56bce2d',
    layout: apiLayoutsMock[0],
    filters: filtersMock,
    pos: 0,
  },
  {
    name: 'Finanzen',
    displayNames: [
      {
        lang: 'de',
        text: 'Finanzen',
      },
    ],
    _id: '60c717a21b5d98c49fc4e8fe',
    layout: apiLayoutsMock[0],
    filters: filtersMock,
    pos: 0,
  },
  {
    name: 'Gebäudefarben',
    displayNames: [
      {
        lang: 'de',
        text: 'Gebäudefarben',
      },
    ],
    _id: '60c77e01e9481dd72235af88',
    layout: apiLayoutsMock[0],
    filters: filtersMock,
    pos: 0,
  },
  {
    name: 'Lage',
    displayNames: [
      {
        lang: 'de',
        text: 'Lage',
      },
    ],
    _id: '60c77e180a0a2b9da8a02a53',
    layout: apiLayoutsMock[0],
    filters: filtersMock,
    pos: 0,
  },
  {
    name: 'Stockwerke',
    displayNames: [
      {
        lang: 'de',
        text: 'Stockwerke',
      },
    ],
    _id: '60c77e1efbde78f162d9c70c',
    layout: apiLayoutsMock[0],
    filters: filtersMock,
    pos: 0,
  },
  {
    name: 'Nutzung',
    displayNames: [
      {
        lang: 'de',
        text: 'Nutzung',
      },
    ],
    _id: '60c77e2486a17d53d5f95ab9',
    layout: apiLayoutsMock[0],
    filters: filtersMock,
    pos: 0,
  },
];
