import { round } from 'lodash';

export const tableNumberFilter = (value: number): string => {
  if (Number.isNaN(value) || value === undefined || value === null) return '';
  const roundedValue = value > -1 && value < 1 ? round(value, 2) : round(value, 0);
  if (roundedValue > 0) return roundedValue.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1'");
  if (roundedValue < 0) {
    return `(${roundedValue
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1'")
      .substr(1)})`;
  }
  if (roundedValue === 0) return '-';
  throw new Error(`Could not apply tableNumberFilter on ${roundedValue}`);
};
