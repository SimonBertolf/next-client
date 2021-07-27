export interface WidgetData {
  readonly _id?: string;
  readonly widget: string; // widget _id
  readonly data: { [key: string]: number | string }[];
}
