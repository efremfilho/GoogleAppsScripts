// From https://g.co/gemini/share/2aa8a5a08e02

/**
 * The main function that handles GET requests.
 * It routes the request based on the URL parameters.
 * @param {Object} e - The request's event object.
 */
function doGet(e) {
  Logger.log('-------------------- NEW REQUEST --------------------');
  Logger.log('Received GET request with the following parameters: %s', JSON.stringify(e.parameter));

  const sheetName = e.parameter.sheet;

  if (sheetName) {
    Logger.log('Routing to function: getDataFromSheet, for sheet: "%s"', sheetName);
    return getDataFromSheet(sheetName);
  } else {
    Logger.log('Routing to function: getSheetNames');
    return getSheetNames();
  }
}

/**
 * Returns a list with the names of all sheets in the spreadsheet.
 * @returns {ContentService.TextOutput} - A JSON response with the list of names.
 */
function getSheetNames() {
  try {
    const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    Logger.log('Active spreadsheet: %s', activeSpreadsheet.getName());

    const sheets = activeSpreadsheet.getSheets();
    const sheetNames = sheets.map(sheet => sheet.getName());
    
    Logger.log('Sheets found: %s', sheetNames.join(', '));
    Logger.log('-------------------- END OF REQUEST --------------------');
    
    return ContentService
      .createTextOutput(JSON.stringify(sheetNames))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    Logger.log('ERROR in getSheetNames: %s', error.toString());
    console.error('Stack Trace for Error in getSheetNames:', error.stack);
    Logger.log('-------------------- END OF REQUEST (WITH ERROR) --------------------');
    return ContentService
      .createTextOutput(JSON.stringify({ error: "An error occurred while fetching sheet names.", details: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Returns the data from a specific sheet in JSON format.
 * @param {string} sheetName - The name of the sheet to fetch data from.
 * @returns {ContentService.TextOutput} - A JSON response with the sheet's data.
 */
function getDataFromSheet(sheetName) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    
    if (!sheet) {
      Logger.log('Attempted to access a non-existent sheet: "%s"', sheetName);
      throw new Error(`The sheet "${sheetName}" was not found.`);
    }
    
    Logger.log('Sheet "%s" found successfully.', sheetName);
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    Logger.log('Total rows found (including header): %s', values.length);
    
    if (values.length < 2) {
      Logger.log('The sheet "%s" only contains a header or is empty. Returning an empty array.', sheetName);
      Logger.log('-------------------- END OF REQUEST --------------------');
      return ContentService
        .createTextOutput(JSON.stringify([]))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Remove the first row (headers) from the values array
    const headers = values.shift(); 
    Logger.log('Headers extracted: %s', headers.join(', '));
    Logger.log('Number of data rows to be processed: %s', values.length);
    
    const jsonData = values.map((row, rowIndex) => {
      let obj = {};
      row.forEach((item, index) => {
        if (headers[index]) {
          obj[headers[index]] = item;
        }
      });
      // The log below can be very verbose for large sheets.
      // Uncomment only if you need to debug a specific row.
      // Logger.log('Processing row %s: %s', rowIndex + 1, JSON.stringify(obj));
      return obj;
    });
    
    Logger.log('JSON conversion completed successfully.');
    Logger.log('-------------------- END OF REQUEST --------------------');
    
    return ContentService
      .createTextOutput(JSON.stringify(jsonData))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('ERROR in getDataFromSheet: %s', error.toString());
    console.error('Stack Trace for Error in getDataFromSheet:', error.stack);
    Logger.log('-------------------- END OF REQUEST (WITH ERROR) --------------------');
    return ContentService
      .createTextOutput(JSON.stringify({ error: "An error occurred while processing the sheet data.", details: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
