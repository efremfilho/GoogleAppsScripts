function uploadFile(url,title,mimeType) {
  var downloadFile = UrlFetchApp.fetch(url).getBlob();
  var file; 
  
  if (mimeType == "M4A") {
    file = {
      title: title,
      mimeType: 'audio/m4a'
    };
  }
  if (mimeType == "CHAT") {
    file = {
      title: title,
      mimeType: 'text/plain'
    };
  }
  if (mimeType == "MP4") {
    file = {
      title: title,
      mimeType: 'video/mp4'
    };
  }
  file = Drive.Files.insert(file, downloadFile);
  var urlToFile = moveFile(file.id);
  return urlToFile;
  Logger.log('ID: %s, File size (bytes): %s', file.id, file.fileSize);
}
