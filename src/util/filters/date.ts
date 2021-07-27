export const dateTimeFilter = (value: string): string => {
  const date = new Date(value);
  return `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`;
};

export const dateFormatFilter = (value: string): string => {
  if (value === '0000-00-00') return '-';
  const itsDate = new Date(value);
  if (!itsDate) throw new Error(`invalid date format for parameter value, with value: ${value}`);
  return `${itsDate.getDay()}.${itsDate.getMonth() + 1}.${itsDate.getFullYear()}`;
};
