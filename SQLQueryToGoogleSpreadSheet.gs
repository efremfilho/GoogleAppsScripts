function getDataFromQuery() {
  var sqlQuery = Browser.inputBox('Enter the SQL Query:', Browser.Buttons.OK_CANCEL);
  var start = new Date();
  var conn = Jdbc.getCloudSqlConnection('jdbc:google:rdbms:subname'); //Make your connection to google cloud
  var stmt = conn.createStatement();
  stmt.setMaxRows(10000);
  var rs = stmt.executeQuery(sqlQuery);
  var doc = SpreadsheetApp.getActiveSpreadsheet();  
  var sheet = doc.insertSheet(0);
  sheet.setName(new Date()); //Change the name for the sheet
  var nameOfColumns = sheet.getRange('A1');
  var dataRangeStart = doc.getRange('A2');
  var row = 0;
  for (var col = 0; col < rs.getMetaData().getColumnCount(); col++) {
    nameOfColumns.offset(row,col).setValue(rs.getMetaData().getColumnName(col + 1));
  }
  while (rs.next()) {
    for (var col = 0; col < rs.getMetaData().getColumnCount(); col++) {
      dataRangeStart.offset(row, col).setValue(rs.getString(col + 1));
    }
    row++;
  }
  rs.close();
  stmt.close();
  conn.close();
  var end = new Date();
  Logger.log('Time elapsed: ' + (end.getTime() - start.getTime()));
}
