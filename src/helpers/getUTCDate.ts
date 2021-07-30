export const getUTCDate = (dateString = Date.now()): number => {
  const date: Date = new Date(dateString);

  return date.getUTCDate();
};
  