
export default function getAge(birthday) {
  // console.log(birthday);
  if (!birthday) {
    return 'Unspecified';
  }
  const year = birthday.slice(0, 4);
  if (isNaN(year)) {
    return 'Unspecified';
  }
  return `${new Date(Date.now()).getFullYear() - Number.parseInt(year, 10)} years`;
}