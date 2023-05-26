const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

export default function getDate(date) {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = newDate.getMonth();
  const day = newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();
  return `${day} ${monthNames[month]} ${year}`;
}