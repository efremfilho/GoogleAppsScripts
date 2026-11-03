function createMeeting(topic,startTime,duration) {
  // This is based on https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingcreate
  // Go to https://marketplace.zoom.us/develop/create and create a JWT app to get the token
  
  var userId = '[YOUR EMAIL OU USERID]';
  var url = 'https://api.zoom.us/v2/users/' + userId + '/meetings';
  var token = '[YOUR TOKEN]';
  var timezone = 'America/Sao_Paulo'; //select your timezone - https://marketplace.zoom.us/docs/api-reference/other-references/abbreviation-lists#timezones 
  var type = '2'; //this is for schedule meeting
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
