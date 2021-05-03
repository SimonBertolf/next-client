import _ from 'lodash';

export const tableNumberFilter = (value: number): string => {
  if (Number.isNaN(value) || value === undefined || value === null) return '';
  const roundedValue = value > 0 && value <= 1 ? _.round(value, 2) : _.round(value, 0);
  if (value > 0) return roundedValue.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1'");
  if (value < 0) {
    return `(${roundedValue
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1'")
      .substr(1)})`;
  }
  if (value === 0) return '-';
  throw new Error(`Could not apply tableNumberFilter on ${roundedValue}`);
};
