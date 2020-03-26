function sendEmail(row,email,subject,body) {
  
  //var
  const StatusColumn = 5;
  var spreadsheet = SpreadsheetApp.openById("[YOUR SHEET ID]");
  var mgmtSheet = spreadsheet.getSheetByName("E-mails managament");
  var answer = "";
  
  // Check if message is already sent
  if (mgmtSheet.getRange(row, StatusColumn).getValue() != ""){
    answer = Browser.msgBox('You already sent a message, do you want to resend?', Browser.Buttons.YES_NO);
    
    if (answer == "no"){
      return Browser.msgBox("Message not sent!");
    }
  }
  
  MailApp.sendEmail({
    to: email,
    subject: subject,
    htmlBody: body,
    name: '[YOUR COMPANY NAME]',
    replyTo: '[YOUR EMAIL]'
  }); 
  
  if (mgmtSheet.getRange(row, StatusColumn).getValue() != ""){
    mgmtSheet.getRange(row, StatusColumn).setValue(mgmtSheet.getRange(row, StatusColumn).getValue() + "\nInvite sent - " + Date.now());
  }else{
    mgmtSheet.getRange(row, StatusColumn).setValue(mgmtSheet.getRange(row, StatusColumn).getValue() + "Invite sent - " + Date.now());
  }
  return Browser.msgBox("Message sent for " + email + " and registered at column 'timestamp do envio'!");
  
}

