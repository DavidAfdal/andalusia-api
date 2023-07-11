function dateFormater(date: Date, separator: string) {
  let day = date.getDate();
  // add +1 to month because getMonth() returns month from 0 to 11
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  // show date and month in two digits
  // if month is less than 10, add a 0 before it

  let newday: string = day.toString();
  let newMonth: string = month.toString();

  if (day < 10) {
    newday = '0' + day.toString();
  }

  if (month < 10) {
    newMonth = '0' + month.toString();
  }
  console.log(date.getDate(), year, month);
  console.log(newday, newMonth);

  return newday + separator + newMonth + separator + year.toString();
}

export default dateFormater;
