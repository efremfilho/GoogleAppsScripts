//Function called by getRecordingList.gs
function deleteFile(meetingId) {
  var userId = [YOUR USER ID];
  var url = 'https://api.zoom.us/v2/meetings/' + meetingId + '/recordings?action=trash';
  var token = [YOUR TOKEN];
  var options =
      {
        'method'  : 'DELETE',   
        'followRedirects' : true,
        'muteHttpExceptions': true,
        "headers": {
          "Accept": "application/json, application/xml",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        }
      };
  var response = UrlFetchApp.fetch(url, options);
  var json = response.getContentText();
}
