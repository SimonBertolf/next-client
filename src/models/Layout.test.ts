import { ResponsiveWidgetLayoutItems, WidgetAppearance } from '@/types';
import { apiWidgetsFromResponsiveLayout, responsiveLayoutFromApiWidgets } from './Layout';

const testResponsiveLayout: ResponsiveWidgetLayoutItems = {
  lg: [
    { x: 0, y: 0, w: 4, h: 2, i: '1625243270656', moved: false, _id: '1625243270656', type: 'WidgetB' },
    { x: 0, y: 2, w: 3, h: 2, i: '1625243272544', moved: false, _id: '1625243272544', type: 'WidgetC' },
  ],
  md: [
    { x: 0, y: 0, w: 4, h: 2, i: '1625243270656', moved: false, _id: '1625243270656', type: 'WidgetB' },
    { x: 0, y: 2, w: 4, h: 2, i: '1625243272544', moved: false, _id: '1625243272544', type: 'WidgetC' },
  ],
  sm: [
    { x: 0, y: 0, w: 2, h: 2, i: '1625243270656', moved: false, _id: '1625243270656', type: 'WidgetB' },
    { x: 0, y: 2, w: 2, h: 2, i: '1625243272544', moved: false, _id: '1625243272544', type: 'WidgetC' },
  ],
  xs: [
    { x: 0, y: 0, w: 2, h: 2, i: '1625243270656', moved: false, _id: '1625243270656', type: 'WidgetB' },
    { x: 2, y: 2, w: 2, h: 2, i: '1625243272544', moved: false, _id: '1625243272544', type: 'WidgetC' },
  ],
  xxs: [
    { x: 0, y: 0, w: 2, h: 2, i: '1625243270656', moved: false, _id: '1625243270656', type: 'WidgetB' },
    { x: 0, y: 6, w: 2, h: 2, i: '1625243272544', moved: false, _id: '1625243272544', type: 'WidgetC' },
  ],
};

const testApiWidgets: WidgetAppearance[] = [
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

const emptyResponsiveLayout: ResponsiveWidgetLayoutItems = {
  lg: [],
  md: [],
  sm: [],
  xs: [],
  xxs: [],
};

const emptyApiWidgets: WidgetAppearance[] = [];

describe('apiWidgetsFromResponsiveLayout should', () => {
  test('transform a responsiveLayout into apiWidgets.', () => {
    expect(apiWidgetsFromResponsiveLayout(testResponsiveLayout)).toMatchObject(testApiWidgets);
  });

  test('transform a empty responsiveLayout into apiWidgets.', () => {
    expect(apiWidgetsFromResponsiveLayout(emptyResponsiveLayout)).toMatchObject(emptyApiWidgets);
  });
});

describe('responsiveLayoutFromApiWidgets should', () => {
  test('transform a apiWidgets into responsiveLayout.', () => {
    expect(responsiveLayoutFromApiWidgets(testApiWidgets)).toMatchObject(testResponsiveLayout);
  });

  test('transform a empty apiWidgets into a empty responsiveLayout.', () => {
    expect(responsiveLayoutFromApiWidgets(emptyApiWidgets)).toMatchObject(emptyResponsiveLayout);
  });
});
