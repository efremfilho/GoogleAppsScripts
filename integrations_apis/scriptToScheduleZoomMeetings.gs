//Function to create a event on google calendar and call the function to send data to Zoom
function createMeeting() {

  //Input row
  var row = Browser.inputBox('Which row you want to create? (ex:type number 2, for row two):', Browser.Buttons.OK_CANCEL);
  
  if (isNaN(row)){
    return Browser.msgBox("Meeting not created! '"+ row + "' isn't a number.");
  }
  
  const tittleColumn = 1;
  const startTimeColumn = 2;
  const durationColumn = 3;
  const emailsColumn = 4;
  const locationColumn = 5;
  const infoColumn = 2;
  const timezoneRow = 3;
  const timezoneInNumberRow = 4;
  var ss = SpreadsheetApp.getActive();
  var sheet = ss.getSheetByName("Schedule");
  var sheetInfo = ss.getSheetByName("Infos");
  var title = sheet.getRange(row,tittleColumn).getValue();
  var startTime = sheet.getRange(row,startTimeColumn).getValue();
  var duration = sheet.getRange(row,durationColumn).getValue();
  var guests = sheet.getRange(row,emailsColumn).getValue();
  var timezone = sheetInfo.getRange(timezoneRow, infoColumn);
  
  // Check if message is already sent
  if (sheet.getRange(row, locationColumn).getValue() != ""){
    answer = Browser.msgBox('You already created a meeting for this information, do you want to create again?', Browser.Buttons.YES_NO);
    
    if (answer == "no"){
      return Browser.msgBox("Meeting not created!");
    }
  }
  
  var location = sheet.getRange(row,locationColumn).setValue(sendDataToZoom(title,startTime,duration, timezone));
  var startTime = new Date(startTime);
  startTime = new Date(startTime.setHours(startTime.getHours()));
  var endTime = new Date(startTime);
  endTime.setMinutes(endTime.getMinutes() + duration);
  var event = CalendarApp.getDefaultCalendar().createEvent(title,
                                                           startTime,
                                                           endTime,
                                                           {location: location.getValue(),
                                                            guests: guests,
                                                            sendInvites: true});
  Logger.log(event.getId());
}
                     
//Function to send data to Zoom
function sendDataToZoom(topic,startTime,duration,timezone) {
  // Go to https://marketplace.zoom.us/develop/create and create a JWT app to get the token
  const infoColumn = 2;
  const userIdRow = 2;
  const tokenRow = 1;
  var ss = SpreadsheetApp.getActive();
  var sheetInfo = ss.getSheetByName("Infos");
  var userId = sheetInfo.getRange(userIdRow, infoColumn).getValue();
  var url = 'https://api.zoom.us/v2/users/' + userId + '/meetings';
  var token = sheetInfo.getRange(tokenRow, infoColumn).getValue();
  var type = '2';
  var payload = '{"topic": "' + topic
  + '","type": "' + type
  + '","start_time": "' + startTime
  + '","duration": "' + duration
  + '","timezone": "' + timezone 
  +'"}';
  var options =
      {
        'method'  : 'POST',   
        'followRedirects' : true,
        'muteHttpExceptions': true,
        "headers": {
          "Accept": "application/json, application/xml",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        'payload': payload
      };
  var response = UrlFetchApp.fetch(url, options);
  var json = response.getContentText();
  var data = JSON.parse(json);
    
  return data.join_url;
}

//Function to create Menu
function onOpen() {
  var ss = SpreadsheetApp.getActive();
  var menuEntries = [{name: "Create a meeting", functionName: "createMeeting"}
                    ];
  ss.addMenu("Zoom", menuEntries);
}
