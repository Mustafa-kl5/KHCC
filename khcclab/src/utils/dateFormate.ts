export const dateFormate = (fullDate: string) => {
  const date = new Date(fullDate);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  month = +(month < 10 ? "0" : "") + month;
  day = +(day < 10 ? "0" : "") + day;
  return year + "/" + month + "/" + day;
};
