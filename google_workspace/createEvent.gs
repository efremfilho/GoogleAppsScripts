function createEvent() {

  var cell = Browser.inputBox('Entre a célular no qual ficará o link do Zoom (ex: D4):', Browser.Buttons.OK_CANCEL);
  
  if(cell == null){
    return 0;
  }  
  
  var ss = SpreadsheetApp.openById([YOUR SPREADSHEET ID]);
  var sheet = ss.getSheetByName([YOUR SHEET]);
  var row = cell.substr(1, 1);
  cell = sheet.getRange(cell).getValue();
  var title = sheet.getRange("A"+row).getValue();
  var duration = sheet.getRange("C"+row).getValue();
  var startTime = sheet.getRange("B"+row).getValue();
  Logger.log(startTime.toString());
  var location = sheet.getRange("D"+row).setValue(criaReuniao(title,startTime,duration));
  Logger.log(startTime.toString());
  Logger.log(location);
  var guests = [YOUR GUESTS]; 
  startTime = new Date(startTime);
  startTime = new Date(startTime.setHours(startTime.getHours() + 4)); //for Brazil
  var endTime = new Date(startTime);
  endTime.setMinutes(endTime.getMinutes()+duration);
  var event = CalendarApp.getDefaultCalendar().createEvent(title,
                                                           startTime,
                                                           endTime,
                                                           {location: location.getValue(),
                                                            guests: guests,
                                                            sendInvites: true});
}
