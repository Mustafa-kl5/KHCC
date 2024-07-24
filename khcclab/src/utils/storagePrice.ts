export function daysSinceCreation(creationDate: string | number | Date) {
  const creation = new Date(creationDate).getTime();
  const currentDate = new Date().getTime();
  const timeDifference = currentDate - creation;
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  return `${daysDifference * 1} JD`;
}
