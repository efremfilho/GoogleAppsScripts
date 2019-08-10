//You need to activate the trigger, go to "Edit" -> "Current project's triggers" -> "Add Trigger" and change "Select event type" to "On edit"

function fulfilColumn() {
  var sheet = SpreadsheetApp.openById("[YOUR SPREADSHEET ID]").getSheetByName("[YOUR SHEET NAME]");
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn(); 
  var range = sheet.getRange(1,1,lastRow,lastColumn); 
 
  for (i = 2; i <= lastRow; i++){
    
    // Check if has a value
    if (range.getCell(i, lastColumn-1).getValue() == ""){
      range.getCell(i, lastColumn-1).setValue([YOUR FUNCTION]); //for example '=YEAR(C' + i +')'
    }
  }
}
