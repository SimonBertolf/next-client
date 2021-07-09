import { ResponsiveWidgetLayoutItems, WidgetLayoutItems } from '@/types';
import { Layout } from '@/models';

export const responsiveLayoutMock: ResponsiveWidgetLayoutItems = {
  lg: [
    { x: 0, y: 0, w: 1, h: 1, i: '1625243270656', _id: '1625243270656', type: 'WidgetB' },
    { x: 1, y: 0, w: 1, h: 1, i: '1625243272544', _id: '1625243272544', type: 'WidgetC' },
    { x: 2, y: 0, w: 1, h: 1, i: '1625243392815', _id: '1625243392815', type: 'WidgetC' },
    { x: 3, y: 0, w: 1, h: 1, i: '1625244555979', _id: '1625244555979', type: 'WidgetA' },
    { x: 4, y: 0, w: 1, h: 1, i: '1625245044009', _id: '1625245044009', type: 'WidgetA' },
    { x: 5, y: 0, w: 1, h: 1, i: '1625245194284', _id: '1625245194284', type: 'WidgetA' },
  ],
  md: [
    { x: 0, y: 0, w: 4, h: 2, i: '1625243270656', _id: '1625243270656', type: 'WidgetB' },
    { x: 0, y: 2, w: 4, h: 2, i: '1625243272544', _id: '1625243272544', type: 'WidgetC' },
    { x: 0, y: 4, w: 5, h: 2, i: '1625243392815', _id: '1625243392815', type: 'WidgetC' },
    { x: 5, y: 4, w: 5, h: 2, i: '1625244555979', _id: '1625244555979', type: 'WidgetA' },
    { x: 4, y: 0, w: 2, h: 4, i: '1625245044009', _id: '1625245044009', type: 'WidgetA' },
    { x: 6, y: 0, w: 4, h: 4, i: '1625245194284', _id: '1625245194284', type: 'WidgetA' },
  ],
  sm: [
    { x: 0, y: 0, w: 2, h: 2, i: '1625243270656', _id: '1625243270656', type: 'WidgetB' },
    { x: 0, y: 2, w: 2, h: 2, i: '1625243272544', _id: '1625243272544', type: 'WidgetC' },
    { x: 2, y: 0, w: 2, h: 2, i: '1625243392815', _id: '1625243392815', type: 'WidgetC' },
    { x: 2, y: 2, w: 2, h: 2, i: '1625244555979', _id: '1625244555979', type: 'WidgetA' },
    { x: 4, y: 0, w: 2, h: 2, i: '1625245044009', _id: '1625245044009', type: 'WidgetA' },
    { x: 4, y: 2, w: 2, h: 2, i: '1625245194284', _id: '1625245194284', type: 'WidgetA' },
  ],
  xs: [
    { x: 0, y: 0, w: 2, h: 2, i: '1625243270656', _id: '1625243270656', type: 'WidgetB' },
    { x: 1, y: 2, w: 3, h: 2, i: '1625243272544', _id: '1625243272544', type: 'WidgetC' },
    { x: 2, y: 0, w: 2, h: 2, i: '1625243392815', _id: '1625243392815', type: 'WidgetC' },
    { x: 0, y: 2, w: 1, h: 2, i: '1625244555979', _id: '1625244555979', type: 'WidgetA' },
    { x: 0, y: 4, w: 4, h: 4, i: '1625245044009', _id: '1625245044009', type: 'WidgetA' },
    { x: 0, y: 8, w: 4, h: 2, i: '1625245194284', _id: '1625245194284', type: 'WidgetA' },
  ],
  xxs: [
    { x: 0, y: 0, w: 1, h: 1, i: '1625243270656', _id: '1625243270656', type: 'WidgetB' },
    { x: 1, y: 0, w: 1, h: 1, i: '1625243272544', _id: '1625243272544', type: 'WidgetC' },
    { x: 0, y: 1, w: 1, h: 1, i: '1625243392815', _id: '1625243392815', type: 'WidgetC' },
    { x: 1, y: 1, w: 1, h: 1, i: '1625244555979', _id: '1625244555979', type: 'WidgetA' },
    { x: 0, y: 2, w: 1, h: 1, i: '1625245044009', _id: '1625245044009', type: 'WidgetA' },
    { x: 1, y: 2, w: 1, h: 1, i: '1625245194284', _id: '1625245194284', type: 'WidgetA' },
  ],
};

export const layoutsMock: Layout[] = [
  {
    _id: '60c8b6a92b48b3a8ebb276ae',
    name: 'My Fantastic Layout',
    responsiveLayout: responsiveLayoutMock,
  },
];

export const layoutMock: WidgetLayoutItems = [];
