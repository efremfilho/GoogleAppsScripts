function splitCellToRows() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName([YOUR SHEET]);
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();
  const range = sheet.getRange(1, 1, lastRow, lastColumn);
  const rows = sheet.getDataRange().getValues();
  const new_sheet = ss.insertSheet('result_' + Date.now());
  const columnToSplit = 6;
  const delimiter = ";";
  let new_rows = [];

  new_sheet.appendRow(rows[0].concat("new_split_column"));
  for (i = 2; i <= lastRow; i++) {
    let new_rows = sheet.getRange(i, columnToSplit).getValue().split(delimiter);
    for (j = 0; j < new_rows.length; j++) {
      new_sheet.appendRow(rows[i - 1].concat(new_rows[j].trim()));
    }
  }

}
