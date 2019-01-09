// API call - http://jurus.com.br/api/v1/bonds
// Spreadsheet example - https://go.efrem.io/jurus-spreadsheet

//Create Menu entry

var ss = SpreadsheetApp.getActiveSpreadsheet();

function onOpen() {
  var menuEntries = [ {name: "Import new data", functionName: "importDataFromJurus"}
                    ];
  ss.addMenu("jurus.com.br", menuEntries);
}


function importDataFromJurus() {
  // API's data 
  var url = 'http://jurus.com.br/api/v1/bonds';
  var response = UrlFetchApp.fetch(url);
  var json = response.getContentText();
  var data = JSON.parse(json);
  var size = data.bonds.length;
  
  //Date variables
  var date = new Date();
  var minute = date.getMinutes();
  var hour = date.getHours()
  var day = date.getDate(); 
  var month = date.getMonth() + 1;
  var year = date.getYear();
  
  // Sheet variables
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var activeSheet = ss.getActiveSheet();
  var yourNewSheet = ss.getSheetByName("data from " + year + "-" + month + "-" + day + " " + hour + ":" + minute);

    if (yourNewSheet != null) {
        activeSpreadsheet.deleteSheet(yourNewSheet);
    }

    yourNewSheet = ss.insertSheet();
    yourNewSheet.setName("data from" + year + "-" + month + "-" + day + " " + hour + ":" + minute);
  
  // include column names
  yourNewSheet.appendRow([
    "_id",
    "issuer",
    "liquidity",
    "isliquidity",
    "incentivada",
    "qualificado",
    "maturity",
    "maturityDays",
    "rate",
    "interest",
    "amortization",
    "grace",
    "rating",
    "agency",
    "quantity",
    "unitPrice",
    "category",
    "dealer",
    "index"
    ]);


  // insert data
  for(var a = 0; a<size; a++){
    yourNewSheet.appendRow([
    data.bonds[a]._id,
    data.bonds[a].issuer,
    data.bonds[a].liquidity,
    data.bonds[a].isliquidity,
    data.bonds[a].incentivada,
    data.bonds[a].qualificado,
    data.bonds[a].maturity,
    data.bonds[a].maturityDays,
    data.bonds[a].rate,
    data.bonds[a].interest,
    data.bonds[a].amortization,
    data.bonds[a].grace,
    data.bonds[a].rating,
    data.bonds[a].agency,
    data.bonds[a].quantity,
    data.bonds[a].unitPrice,
    data.bonds[a].category,
    data.bonds[a].dealer,
    data.bonds[a].index
    ]);
  }  
}
