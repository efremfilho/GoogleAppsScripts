function getFilesFromFolder() {
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("[YOUR SHEET]"); 
  let folder = DriveApp.getFolderById("[YOUR FOLDER ID]");
  let folders = folder.getFolders()
  while (folders.hasNext()) {
    let insideFolder = folders.next();
    sheet.appendRow([insideFolder.getName()]);
  }
}
