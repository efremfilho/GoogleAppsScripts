function translateEN2PT() {

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName([YOUR SHEET]);
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn(); 
  var range = sheet.getRange(1,1,lastRow,lastColumn); 
  
  for (i =3904; i <=lastRow; i++){
   var portuguese = LanguageApp.translate(range.getCell(i,1).getValue(), 'en', 'pt'); //for column 1
   Logger.log(portuguese);
   range.getCell(i, 3).setValue(portuguese); // for column 3
   }
}
