//The code you should run
function getRecordingList() {
  var date = [YOUR DATE IN FORMAT YYYY-MM-DD];
  var topic;
  var mimeType;
  var urlToDownload;
  var file;
  var meetingDeleted;
  var userId = [YOUR USER ID];
  var url = 'https://api.zoom.us/v2/users/' + userId + '/recordings?from=' + date + '&mc=false&page_size=300';
  var token = [YOUR TOKEN];
  var options =
      {
        'method'  : 'GET',   
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
  var data = JSON.parse(json);
  
  for(var a = 0; a<data.total_records; a++){
    topic = data.meetings[a].topic;
    for(var b = 0; b<data.meetings[a].recording_count; b++){
      mimeType = data.meetings[a].recording_files[b].file_type;
      urlToDownload = data.meetings[a].recording_files[b].download_url;
      file = uploadFile(urlToDownload,topic,mimeType);
    }
    meetingDeleted = deleteFile(data.meetings[a].uuid);
  }
}
