export const inXdays = (days: number) => {
  const today = new Date();
  return new Date(new Date().setDate(today.getDate() + days));
};

export const inXMinutes = (minutes: number) => {
  const today = new Date();
  return new Date(new Date().setMinutes(today.getMinutes() + minutes));
};
