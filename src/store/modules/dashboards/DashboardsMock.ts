import { Dashboard } from '@/models';
import { Filter, FilterSelection } from '@/types';
import { layoutsMock } from '../layouts/LayoutsMock';

export const filtersMock: Filter[] = [
  {
    key: 'date',
    type: 'DateRange',
    options: { from: new Date('2012-01-06T13:21:33+000Z'), to: new Date('2021-07-06T13:21:33+000Z') },
  },
  {
    key: 'clients',
    type: 'Select',
    options: ['01', '02', '03'],
  },
  {
    key: 'portfolios',
    type: 'Select',
    options: ['01', '02', '03'],
  },
  {
    key: 'regions',
    type: 'Select',
    options: ['01', '02', '03'],
  },
  {
    key: 'assets',
    type: 'Select',
    options: ['01', '02', '03'],
  },
  {
    key: 'usages',
    type: 'Select',
    options: ['01', '02', '03'],
  },
  {
    key: 'kinds',
    type: 'Select',
    options: ['01', '02', '03'],
  },
  {
    key: 'tanants',
    type: 'Select',
    options: ['01', '02', '03'],
  },
];

export const dashboardsMock: Dashboard[] = [
  {
    name: 'Übersicht',
    _id: '60c717880e671f91b56bce2d',
    layout: layoutsMock[0],
    filters: filtersMock,
  },
  {
    name: 'Finanzen',
    _id: '60c717a21b5d98c49fc4e8fe',
    layout: layoutsMock[0],
    filters: filtersMock,
  },
  {
    name: 'Gebäudefarben',
    _id: '60c77e01e9481dd72235af88',
    layout: layoutsMock[0],
    filters: filtersMock,
  },
  {
    name: 'Lage',
    _id: '60c77e180a0a2b9da8a02a53',
    layout: layoutsMock[0],
    filters: filtersMock,
  },
  {
    name: 'Stockwerke',
    _id: '60c77e1efbde78f162d9c70c',
    layout: layoutsMock[0],
    filters: filtersMock,
  },
  {
    name: 'Nutzung',
    _id: '60c77e2486a17d53d5f95ab9',
    layout: layoutsMock[0],
    filters: filtersMock,
  },
];

export const filterSelectionsMock: FilterSelection[] = [
  [new Date('2021-07-06T13:21:33.000Z').toISOString(), new Date('2021-07-21T13:21:33.000Z').toISOString()],
  [],
  ['01', '03'],
  [],
  [],
  [],
  [],
  [],
];
