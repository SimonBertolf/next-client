import _ from 'lodash';

export const percentNumberFilter = (value: number): string => {
  if (Number.isNaN(value) || value === undefined || value === null) return '';
  const roundedValue = value > 0 && value <= 1 ? _.round(value, 2) : _.round(value, 0);
  if (value === 0) return '-';
  if (value > 0 || value < 0) {
    const percentValue = value * 100;
    const roundedPercentValue = _.round(percentValue, 1);
    return `${roundedPercentValue}%`;
  }
  throw new Error(`Could not apply percent-number-filter on ${roundedValue}`);
};
