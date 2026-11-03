/* Example JSON

{
"tag":{
"city":{
"variable 1":0,
"variable 2":0,
"variable 3":"6.67"
},
"city 2":{
"variable 1":0,
"variable 2":0,
"variable 3":"6.67"
}
}
}
*/

function generateJSON() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("[YOUR SPREADSHEET]");
  var sheetCity = ss.getSheetByName("[YOUR SHEET]");
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn(); 
  var range = sheet.getRange(1,1,lastRow,lastColumn);
  var rangeCity = sheetCity.getRange(1,1,11,1); //for a sheet with second level
  var lastRowCity = sheetCity.getLastRow();
  var json = "{";
  
  // for tags
  for (i=2; i<=lastRow; i++){
    json = json + '"' + range.getCell(i, 1).getValue() + '":{';
    
    //for city
    for (j=2; j<=lastRowCity; j++){
      json = json + '"' + rangeCity.getCell(j, 1).getValue() + '":{';

      // for variables
      json = json + '"' + range.getCell(1, j).getValue() + '":' + '"' + range.getCell(i, j).getValue() + '",'; //for variable 1
      json = json + '"' + range.getCell(1, j+10).getValue() + '":' + '"' + range.getCell(i, j+10).getValue() + '",'; // for variable 2
      json = json + '"' + range.getCell(1, j+20).getValue() + '":' + '"' + range.getCell(i, j+20).getValue() + '"'; //for variable 3
      
      if(j == lastRowCity){
        json = json + "}";
      }else{
        json = json + "},";
      }
    }
    if(i == lastRow){
      json = json + "}";
    }else{
      json = json + "},";
    }
  }
  json = json + "}";
  Logger.log(json);
  DriveApp.createFile('post.json', json); //create to google drive
}
