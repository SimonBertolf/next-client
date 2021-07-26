export const dateTimeFilter = (value: string): string => {
  const date = new Date(value);
  return `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`;
};
