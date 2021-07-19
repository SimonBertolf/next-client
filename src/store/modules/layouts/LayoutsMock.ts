import { WidgetAppearance, WidgetLayoutItems } from '@/types';
import { ApiLayout } from '@/models';

export const apiWidgetsMock: WidgetAppearance[] = [
  {
    _id: '1625243270656',
    type: 'WidgetB',
    responsiveCoordinates: [
      {
        breakpoint: 'lg',
        x: 0,
        y: 0,
        w: 4,
        h: 2,
      },
      {
        breakpoint: 'md',
        x: 0,
        y: 0,
        w: 4,
        h: 2,
      },
      {
        breakpoint: 'sm',
        x: 0,
        y: 0,
        w: 2,
        h: 2,
      },
      {
        breakpoint: 'xs',
        x: 0,
        y: 0,
        w: 2,
        h: 2,
      },
      {
        breakpoint: 'xxs',
        x: 0,
        y: 0,
        w: 2,
        h: 2,
      },
    ],
  },
  {
    _id: '1625243272544',
    type: 'WidgetC',
    responsiveCoordinates: [
      {
        breakpoint: 'lg',
        x: 0,
        y: 2,
        w: 3,
        h: 2,
      },
      {
        breakpoint: 'md',
        x: 0,
        y: 2,
        w: 4,
        h: 2,
      },
      {
        breakpoint: 'sm',
        x: 0,
        y: 2,
        w: 2,
        h: 2,
      },
      {
        breakpoint: 'xs',
        x: 2,
        y: 2,
        w: 2,
        h: 2,
      },
      {
        breakpoint: 'xxs',
        x: 0,
        y: 6,
        w: 2,
        h: 2,
      },
    ],
  },
];

export const apiLayoutsMock: ApiLayout[] = [
  {
    _id: '60c8b6a92b48b3a8ebb276ae',
    name: 'My Fantastic Layout',
    displayNames: [],
    widgets: apiWidgetsMock,
  },
];

export const layoutMock: WidgetLayoutItems = [];
