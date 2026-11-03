//Triggers scripts for Google Sheet - https://go.efrem.io/sheet-bitcoin-value

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

function update_time_series() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  //Value of Bitcoin
  var sheet_values = ss.getSheets()[0];
  var last_row_values = sheet_values.getLastRow();
  var cell_values = sheet_values.getRange(last_row_values, 8);
  var cell_destination_values = sheet_values.getRange(last_row_values, 9);
  var string_to_formula_values = '=CONCATENATE("' + sheet_values.getRange(last_row_values, 2).getValue() +
                                 '","/","' + sheet_values.getRange(last_row_values, 3).getValue() +
                                 '","/","' + sheet_values.getRange(last_row_values, 1).getValue() +
                                  '"," ","' + sheet_values.getRange(last_row_values, 4).getValue() +
                                 '",":","' + sheet_values.getRange(last_row_values, 5).getValue() + '",":","00")';
  Logger.log(string_to_formula_values);
  cell_values.setFormula(string_to_formula_values);
  cell_destination_values.setValue(cell_values.getValue());
  Logger.log("Para o BTC"+  "\n" + "o valor que veio é " + cell_values.getValue() + "\n" + "o valor que chegou é " + cell_destination_values.getValue());

  //Bitcoin to other currencies
  var sheet_currencies = ss.getSheets()[2];
  var last_row_currencies = sheet_currencies.getLastRow();
  var cell_currencies = sheet_currencies.getRange(last_row_currencies, 17);
  var cell_destination_currencies = sheet_currencies.getRange(last_row_currencies, 18);
    var string_to_formula_currencies = '=CONCATENATE("' + sheet_values.getRange(last_row_currencies, 2).getValue() +
                                 '","/","' + sheet_currencies.getRange(last_row_currencies, 3).getValue() +
                                 '","/","' + sheet_currencies.getRange(last_row_currencies, 1).getValue() +
                                  '"," ","' + sheet_currencies.getRange(last_row_currencies, 4).getValue() +
                                 '",":","' + sheet_currencies.getRange(last_row_currencies, 5).getValue() + '",":","00")';
  Logger.log(string_to_formula_currencies);

  cell_currencies.setFormula(string_to_formula_currencies);
  //cell_currencies.copyValuesToRange(sheet_currencies, 18, 18, last_row_currencies, last_row_currencies);
  cell_destination_currencies.setValue(cell_currencies.getValue());
  Logger.log("Para as moedas" +  "\n" + "o valor que veio é " + cell_currencies.getValue() + "\n" + "o valor que chegou é " + cell_destination_currencies.getValue());

}
