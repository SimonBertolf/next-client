export interface WidgetData {
  readonly _id: string; // widget _id
  readonly data: { [key: string]: number | string }[];
}
