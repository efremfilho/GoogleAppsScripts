function getHours(unixTimestamp) {
  var date = new Date(unixTimestamp*1000);
  return date.getHours();
}

function getDate(unixTimestamp) {
  var date = new Date(unixTimestamp*1000);
  return date.getDate();
}

function getMonth(unixTimestamp) {
  var date = new Date(unixTimestamp*1000);
  return date.getMonth();
}

function getYear(unixTimestamp) {
  var date = new Date(unixTimestamp*1000);
  return date.getFullYear();
}

function gettimeStamp(unixTimestamp) {
  var date = new Date(unixTimestamp*1000);
  return date.toUTCString();
}
