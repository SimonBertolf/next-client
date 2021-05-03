import _ from 'lodash';

export const simpleNumberFilter = (value: number): string => {
  if (Number.isNaN(value) || value === undefined || value === null) return '';
  if (value === 0) return '-';
  if (value > 0 || value < 0) {
    const roundedValue = _.round(value, 2);
    const formatter = new Intl.NumberFormat('de-CH');
    return formatter
      .formatToParts(roundedValue)
      .map((content) => {
        const { type } = content;
        const val = content.value;
        switch (type) {
          case 'group':
            return "'";
          case 'decimal':
            return ',';
          default:
            return val;
        }
      })
      .reduce((string, part) => string + part);
  }
  throw new Error(`Could not apply simple-number-filter on ${value}`);
};
