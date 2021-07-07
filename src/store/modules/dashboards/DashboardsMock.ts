import { Dashboard } from '@/models';
import { Filter } from '@/types';

export const dashboardsMock: Dashboard[] = [
  {
    name: 'Übersicht',
    _id: '60c717880e671f91b56bce2d',
  },
  {
    name: 'Finanzen',
    _id: '60c717a21b5d98c49fc4e8fe',
  },
  {
    name: 'Gebäudefarben',
    _id: '60c77e01e9481dd72235af88',
  },
  {
    name: 'Lage',
    _id: '60c77e180a0a2b9da8a02a53',
  },
  {
    name: 'Stockwerke',
    _id: '60c77e1efbde78f162d9c70c',
  },
  {
    name: 'Nutzung',
    _id: '60c77e2486a17d53d5f95ab9',
  },
];

export const filtersMock: Filter[] = [
  {
    key: 'date',
    type: 'DateRange',
    available: { from: new Date('2012-01-06T13:21:33+0000'), to: new Date('2021-07-06T13:21:33+0000') },
    selected: { from: new Date('2021-01-06T13:21:33+0000'), to: new Date('2021-07-06T13:21:33+0000') },
  },
  {
    key: 'clients',
    type: 'Select',
    available: ['01', '02', '03'],
    selected: [],
  },
  {
    key: 'portfolios',
    type: 'Select',
    available: ['01', '02', '03'],
    selected: ['01', '03'],
  },
  {
    key: 'regions',
    type: 'Select',
    available: ['01', '02', '03'],
    selected: [],
  },
  {
    key: 'assets',
    type: 'Select',
    available: ['01', '02', '03'],
    selected: [],
  },
  {
    key: 'usages',
    type: 'Select',
    available: ['01', '02', '03'],
    selected: [],
  },
  {
    key: 'kinds',
    type: 'Select',
    available: ['01', '02', '03'],
    selected: [],
  },
  {
    key: 'tanants',
    type: 'Select',
    available: ['01', '02', '03'],
    selected: [],
  },
];
