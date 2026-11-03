//Menu to call the function to call for each line.
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('[MENU NAME]')
      .addItem('[WEBHOOK TO CALL]', 'callWebhook')
      .addToUi();
}


//function to call for each line.
function callWebhook() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();

  for (let i = 2; i <= lastRow; i++) {
    let formData = {
      'name': sheet.getRange(i, 1).getValue(),  //send data to json, here is name
      'email': sheet.getRange(i, 2).getValue(), //send data to json, here is email
      'row': i.toString() //send row to json, this is used to update the line with the result via zapier
    };
    let options = {
      'method': 'post',
      'payload': formData
    };
    if (sheet.getRange(i, 3).getValue() == "") {
      UrlFetchApp.fetch('[YOUR HOOK HERE]', options); //put your hook's URL here
    }
  }
}
