function getDataFromEmail(email) {
  let opKey = [YOUR-KEY]; 
  let at = email.indexOf("@");
  let len = email.length;
  let emailExtract = email.substr(at, len);
  let url = emailExtract.replace(/[^A-Za-z.]/gi, "");
  let op = 'https://opengraph.io/api/1.1/site/http%3A%2F%2F' + url + '?app_id=' + opKey;
  let response = UrlFetchApp.fetch(op);
  let json = response.getContentText();
  let data = JSON.parse(json);
  return (data.hybridGraph.title + '\n\n' + data.hybridGraph.description);
}
