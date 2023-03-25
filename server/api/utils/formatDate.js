function formatDate(date) {
  const d = new Date(date),
    day = '' + d.getDate(),
    month = '' + (d.getMonth() + 1),
    year = d.getFullYear();

  return [day, month, year].join('-');
}

export default formatDate;
