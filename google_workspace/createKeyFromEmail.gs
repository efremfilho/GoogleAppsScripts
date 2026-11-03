function createKey(email) { 
  var randNumber = Math.floor(Math.random() * (10000000 - 1000000 + 1)) + 1000000;
  var digitalSignature = email.substring(0,email.indexOf("@"))+ "-" 
             + email.substring(email.indexOf("@")+1, email.length).substring(0,email.substring(email.indexOf("@")+1, email.length).indexOf("."))
             + "-" + randNumber;
  return(digitalSignature);
}

function onEdit(e){
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("NAME-OF-SHEET");
  var lastRow = sheet.getLastRow();
  for (i = 1; i <= lastRow; i++) {
    var digitalSignature = sheet.getRange(i,12);
    Logger.log(digitalSignature.getValue());
    var emailForDS = sheet.getRange(i,8);
    Logger.log(emailForDS.getValue());
    if ((digitalSignature.getValue()==0) && !(emailForDS.getValue()==0)){
      digitalSignature.setValue(createKey(sheet.getRange(i,8).getValue())); 
    }
  }
}
