/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TemplateInterface {
  (args: any, { argTypes }: any): unknown;
  args?: any;
}
