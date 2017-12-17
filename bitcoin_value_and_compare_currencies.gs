//Trigger script for Google Sheet - https://go.efrem.io/sheet-bitcoin-value

function getBitcoinPrice() {
  //Date variables
  var date = new Date();
  var minute = date.getMinutes();
  var hour = date.getHours()
  var day = date.getDate(); 
  var month = date.getMonth() + 1;
  var year = date.getYear();
  
  //URL Parameters
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet_parameters = ss.getSheets()[1];
  var sheet_values = ss.getSheets()[0];
  
  //Bitcoin API
  var url = sheet_parameters.getRange(1, 2).getValue() 
            + sheet_parameters.getRange(2, 1).getValue() + "=" + sheet_parameters.getRange(2, 2).getValue() 
            + "&" 
            + sheet_parameters.getRange(3, 1).getValue() + "=" +  sheet_parameters.getRange(3, 2).getValue();
  var bitcoin_value = UrlFetchApp.fetch(url);
  sheet_values.appendRow([year, month, day, hour, minute, bitcoin_value]);  
  
}

function getBitcoinAndCompare() {
  //Date variables
  var date = new Date();
  var minute = date.getMinutes();
  var hour = date.getHours()
  var day = date.getDate(); 
  var month = date.getMonth() + 1;
  var year = date.getYear();
  
  //URL an JSON Parameters
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet_parameters = ss.getSheets()[1];
  var sheet_values = ss.getSheets()[2];
  
  //Cryptocompare API
  var url = sheet_parameters.getRange(7, 2).getValue() 
            + sheet_parameters.getRange(8, 1).getValue() + "=" + sheet_parameters.getRange(8, 2).getValue() 
            + "&" 
            + sheet_parameters.getRange(9, 1).getValue() + "=" +  sheet_parameters.getRange(9, 2).getValue();
  var response = UrlFetchApp.fetch(url);
  var json = response.getContentText();
  var data = JSON.parse(json);
  sheet_values.appendRow([year, month, day, hour, minute,data.ETH,data.XRP,data.USD,data.EUR,data.BRL]);

}
