function sendEmailFromTemplate() {

  //var 
  const extrasFieldsColumn = 4;
  const titleColumn = 3;
  const messageColumn = 5; 
  const templateColumn = 3;
  const emailColumn = 2;
  var spreadsheet = SpreadsheetApp.openById("[YOUR SHEET ID]");
  var templateSheet = spreadsheet.getSheetByName("Emails Templates");
  var mgmtSheet = spreadsheet.getSheetByName("E-mails managament");
  var requiredFields = [];
  var receivedFields = [];
  var bodyFields = [];
  var body = "";
  
  //Input row
  var row = Browser.inputBox('Insert row you want to send email. Ex. 2 for second row');
  if (isNaN(row)){
    return Browser.msgBox("Message not sent! '"+ row + "' is not a number.");
  }
  
  var template = mgmtSheet.getRange(row, templateColumn).getValue();
  
  if (template > templateSheet.getLastRow()){
    return Browser.msgBox("Message not sent! The number is bigger than the amount of templates. Max: " + templateSheet.getLastRow());
  }      
  
  if (isNaN(template)){
    return Browser.msgBox("Message not sent! '"+ template + "' is not a number.");
  }
  requiredFields = templateSheet.getRange(template,extrasFieldsColumn).getValue().split(",");
  receivedFields = mgmtSheet.getRange(row,extrasFieldsColumn).getValue().split(",");
  bodyFields = templateSheet.getRange(template,messageColumn).getValue().split("|");
  
  // Check if it has the correct parameters and create body
  if (requiredFields.length == receivedFields.length){
    var greetings = '<p style="text-align: center;"><img src="https://www.jotform.com/uploads/Roberto_adm/form_files/2C324417-C07A-41C2-BB0E-B3E4EBEAF89D.5de0717b6ff8e5.69318530.png" alt="" /></p>'
                + '<p style="text-align: center;">&nbsp;</p> <p>&nbsp;</p>'
                + 'Olá ' + receivedFields[0] + ", <br><br>";
    var title = templateSheet.getRange(template, titleColumn);
    
    switch(template){
      // 2 fields
      case 2:
      case 7:
      case 8:
      case 9:
        body = greetings + bodyFields[0] + receivedFields[1] + bodyFields[1];
        break;
      
      // 3 fields
      case 3:
      case 4:
      case 5:
        body = greetings + bodyFields[0] + receivedFields[1] + bodyFields[1] + receivedFields[2] + bodyFields[2];
        break;
      
      //Only one field
      case 6:
        body = greetings + bodyFields[0];
        break;
    } 
    
    // Actually send the email
    sendEmail(row
              ,mgmtSheet.getRange(row, emailColumn).getValue()
              ,templateSheet.getRange(template,titleColumn).getValue()
              ,body);
    
    
  // Don't have the same quantity of fields
  }else{
    return Browser.msgBox("Messagenot sent! The amount of parameters is wrong. Please, check and resend the email.");
  } 
}

