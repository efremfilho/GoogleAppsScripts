function postToWordPress(rowNumber) {
  var ss = SpreadsheetApp.openById("[YOUR SPREADSHEET ID]");
  var sheet = ss.getSheetByName("[YOUR SHEET ID]");
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn(); 
  var range = sheet.getRange(1,1,lastRow,lastColumn); 
  var emailToPublish = "[YOUR EMAIL TO POST]@post.wordpress.com";
  
  //for (rowNumber = 41; rowNumber <= lastRow; rowNumber++){
  var emailBody = '[category ' + range.getCell(rowNumber, 47).getValue() + ']\n'
  + '[tags ' + range.getCell(rowNumber, 35).getValue() + ',' + range.getCell(rowNumber, 36).getValue() + ',' 
  + range.getCell(rowNumber, 38).getValue() + ',' + range.getCell(rowNumber, 39).getValue() + ',' 
  + range.getCell(rowNumber, 40).getValue() + ',' + range.getCell(rowNumber, 41).getValue() + ']\n'
  + '[excerpt]from ' + range.getCell(rowNumber, 24).getValue() + '[/excerpt]\n'
  + '[comments off]\n' 
  + '[status publish]\n'
  + '[slug ' + range.getCell(rowNumber, 46).getValue() + ']\n'
  + '[title ' //+ range.getCell(rowNumber, 21).getValue() + ', ' 
  + range.getCell(rowNumber, 38).getValue() + ' - ' + range.getCell(rowNumber, 1).getValue() + ']\n'
//  + '<h1><a style="text-decoration:none;" href="https://coffee.flowins.me/producer/' 
//  + range.getCell(rowNumber, 47).getValue() + '">' + range.getCell(rowNumber, 21).getValue() + '</a> </h1>\n'
//  + '<p>' + range.getCell(rowNumber, 38).getValue() + '</p>\n'
  + '<h2> from ' + range.getCell(rowNumber, 24).getValue() + '</h2>\n'
  + '<h4>' + range.getCell(rowNumber, 1).getValue() + '</h4\n>'
  + '<p>Variety: <strong>' + range.getCell(rowNumber, 38).getValue().replace(/(\r\n|\n|\r)/gm," ") + '</strong></p>\n'
  + '<p>Haverst method: <strong>' + range.getCell(rowNumber, 39).getValue().replace(/(\r\n|\n|\r)/gm," ") + '</strong></p>\n'
  + '<p>Post haverst method: <strong>' + range.getCell(rowNumber, 40).getValue().replace(/(\r\n|\n|\r)/gm," ") + '</strong></p>\n'
  + '<p>Dry method: <strong>' + range.getCell(rowNumber, 41).getValue().replace(/(\r\n|\n|\r)/gm," ") + '</strong></p>\n'
  + '<p>Storage: <strong>' + range.getCell(rowNumber, 35).getValue().replace(/(\r\n|\n|\r)/gm," ") + '</strong></p>\n'
  + '<p>Store: <strong>' + range.getCell(rowNumber, 36).getValue().replace(/(\r\n|\n|\r)/gm," ") + '</strong></p>\n'
  + '<p>Avegare altitude: <strong>' + range.getCell(rowNumber, 10).getValue() + '</strong></p>\n'
  + '<p><a style="text-decoration:none;" href="' + range.getCell(rowNumber, 23).getValue() 
  + '">See high resolutions photos</a></p>\n'
  + '<img style="display:none" src="' + range.getCell(rowNumber, 22).getValue() + '" alt="featured photo" width="1" height="1" >\n'
  + ' [jotform id="92926414427360"]';
  
  GmailApp.sendEmail(emailToPublish, 'published - ' + range.getCell(rowNumber, 1).getValue(), emailBody);
    Logger.log(emailBody);
//    Utilities.sleep(5000);
//  }
}
