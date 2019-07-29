//function copied from https://stackoverflow.com/questions/38808875/moving-files-in-google-drive-using-google-script
function moveFile(sourceFileId) {
  
  var targetFolderId = [FOLDER ID];
  var file = DriveApp.getFileById(sourceFileId);
  file.getParents().next().removeFile(file);
  DriveApp.getFolderById(targetFolderId).addFile(file);
  return file.getUrl();
}
