export const formattedDate = (date) => {
  // console.log(date);
  return (date = new Date(date).toLocaleDateString());
};

export const getToday = () => {
  const local = new Date();
  local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
};
