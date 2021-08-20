// TODO: clean up. Use localized date formatting. e.g. momentjs

export const dateTimeFilter = (value: string): string => {
  const date = new Date(value);
  return `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`;
};

export const dateFormatFilter = (value: string): string => {
  if (value === '0000-00-00') return '-';
  const itsDate = new Date(value);
  if (Number.isNaN(itsDate.getTime())) throw new Error(`invalid date format for parameter value, with value: ${value}`);
  const day = itsDate.getDate();
  const month = itsDate.getMonth() + 1;
  const year = `${itsDate.getFullYear()}`;
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedYear = year.substring(year.length - 2);
  return `${formattedDay}.${formattedMonth}.${formattedYear}`;
};

export const dateMonthFilter = (value: string): string => {
  const date = new Date(value);
  return `${date.getMonth() + 1}.${date.getFullYear()}`;
};
