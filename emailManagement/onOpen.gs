function onOpen() {
  var spreadsheet = SpreadsheetApp.openById("[YOUR SHEET ID]");
  var menuEntries = [{name: "1- Send e-mail", functionName: "sendEmailFromTemplate"},
                     //{name: "SOON", functionName: ""}
                    ];
  spreadsheet.addMenu("[YOUR COMPANY NAME]", menuEntries);
}
