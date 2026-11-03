function findRow(sheetName, idToSearch,columnFromId,columnToReturn){
  var sheet = SpreadsheetApp.openById("1XjS4A7Bwuma4KTkF_TSiHtfvNrMP7EHEOezUbg6KuBk").getSheetByName(sheetName);
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn(); 
  var range = sheet.getRange(1,1,lastRow,lastColumn); 
  for(var i = 2; i <= lastRow; i++){
    if(range.getCell(i, columnFromId).getValue() == idToSearch){ 
      return [i,range.getCell(i, columnToReturn).getValue()];
    }
  }
}
