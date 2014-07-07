function getEmailToSpreadsheet() {

  var threads = GmailApp.search('SEARCH CRITERIA!'); //Put your specific search criteria
  var ss = SpreadsheetApp.create("nameOfTheNewSpreadsheet"); //Put a specific name for a new spreadsheet or use openById
  var sheet = ss.getSheets()[0];

  for (var i = 0; i < threads.length; i++) {
    var messages = threads[i].getMessages();
    for (var j = 0; j < messages.length; j++) {
      sheet.appendRow([messages[j].getFrom(), messages[j].getPlainBody()]); //put any other criteria that you want to save
    }
  }
};
