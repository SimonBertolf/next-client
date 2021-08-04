import type { GridBreakpoint } from 'vue-grid-layout';
import { WidgetAppearance, WidgetLayoutItem, ResponsiveWidgetLayoutItems, gridBreakpoints, WidgetType } from '@/types';
import type { ModelMapper } from '../interfaces/ModelMapper';

export const responsiveLayoutFromApiWidgets: ModelMapper<WidgetAppearance[], ResponsiveWidgetLayoutItems> = (
  apiWidgets,
) => {
  const responsiveLayout = Object.fromEntries(
    gridBreakpoints.map((breakpoint) => [breakpoint, new Array<WidgetLayoutItem>()]),
  );
  gridBreakpoints.forEach((breakpoint) => {
    responsiveLayout[breakpoint].push(
      ...apiWidgets.map((apiWidget) => {
        const coordinates = apiWidget.responsiveCoordinates.find((coord) => coord.breakpoint === breakpoint);
        if (!coordinates) throw new Error('coordinates undefined');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { breakpoint: bp, ...vals } = coordinates;
        return {
          ...vals,
          type: apiWidget.type,
          _id: apiWidget._id,
          i: apiWidget._id,
          moved: false,
        };
      }),
    );
  });
  return responsiveLayout;
};

export const apiWidgetsFromResponsiveLayout: ModelMapper<ResponsiveWidgetLayoutItems, Partial<WidgetAppearance>[]> = (
  responsiveLayout,
) => {
  const breakpoints = Object.keys(responsiveLayout);
  const responsiveWidgetLayoutItems = Object.values(responsiveLayout);
  const widgetMetas = responsiveWidgetLayoutItems.map((widgetLayoutItems) =>
    widgetLayoutItems.map((layoutItem) => ({
      _id: layoutItem._id,
      type: layoutItem.type,
    })),
  );
  const widgets = widgetMetas.reduce((acc: { _id: string; type: WidgetType }[], current) => {
    current.forEach((widget) => {
      if (!acc.find((item) => widget._id === item._id && widget.type === item.type)) {
        acc.push({ _id: widget._id, type: widget.type });
      }
    });
    return acc;
  }, []);
  const apiWidgets = widgets.map((apiWidget) => ({
    ...apiWidget,
    responsiveCoordinates: breakpoints.map((breakpoint) => {
      const widget = responsiveLayout[breakpoint].find((item) => item._id === apiWidget._id);
      if (!widget) throw new Error(`Can not find coordinates for breakpoint ${breakpoint} for widget ${apiWidget._id}`);
      return {
        breakpoint: breakpoint as GridBreakpoint,
        x: widget.x,
        y: widget.y,
        w: widget.w,
        h: widget.h,
      };
    }),
  }));
  // return api widgets and remove temporary new-... ids
  return apiWidgets.map((item) => {
    const { _id, ...rest } = item;
    if (_id?.includes('new-')) return { ...rest };
    return item;
  });
};
