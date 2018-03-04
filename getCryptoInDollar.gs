// Function used inside Google Sheets for transform the amount of a crypto currency to US dollars.

// Example - https://api.coinmarketcap.com/v1/ticker/bitcoin/?convert=USD

function convertCrypto(crypto,value) {

  var urlParse = 'https://api.coinmarketcap.com/v1/ticker/'
                + crypto + '/?convert=USD';
  var json = UrlFetchApp.fetch(urlParse).getContentText();
  var data = JSON.parse(json);
  
  return data[0].price_usd*value;
}
