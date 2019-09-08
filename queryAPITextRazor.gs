function getTopicsFromTextRazor() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName([YOUR SHEET]);
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn(); 
  var range = sheet.getRange(1,1,lastRow,lastColumn); 
  var url = 'https://api.textrazor.com';
 
  for (i = 2; i <= lastRow; i++){
    
    var payload = {"extractors":"entities,topics",
                   "text":'"' + range.getCell(i, 7).getValue() + '"'};  //for entitties and topics
    var options =
        {
          'method'  : 'POST',   
          'followRedirects' : true,
          'muteHttpExceptions': true,
          "headers": {
            "Content-Type": "application/json",
            "X-TextRazor-Key": "[YOUR API KEY]"
          },
          'payload': payload
        };
    
    var response = UrlFetchApp.fetch(url, options);
    var json = response.getContentText();
    var data = JSON.parse(json);
    
    //keyword
    var keywordplus = "";
    for(var a = 0;(data.response.topics) && (data.response.topics[a].score>=0.5); a++){
      keywordplus = keywordplus + data.response.topics[a].label;
      if (data.response.topics[a+1].score<0.5){
        break;
      }
      keywordplus = keywordplus + ",";
      
    }
    range.getCell(i, 8).setValue(keywordplus);
  }
}
