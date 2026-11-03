var ss = SpreadsheetApp.getActiveSpreadsheet();

function onOpen() {
  var menuEntries = [ {name: "Import from Google Places", functionName: "PlacesToSheet"}
                    ];
  ss.addMenu("Places", menuEntries);
}

function PlacesToSheet() {
  var urlInit = "https://www.google.com/maps/preview?q=";
  var latlong = Browser.inputBox('Enter lat,long (ex: -23.560141,-46.657220):', Browser.Buttons.OK_CANCEL);
  
  if(latlong == null){
    return 0;
  }
  
  var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+latlong+
  '&radius=100&types=parking&key=YOUR_API_KEY';         //Put youe API Key and set the radius
  var response = UrlFetchApp.fetch(url);
  var json = response.getContentText();
  var data = JSON.parse(json);
  var size = data.results.length;
  
  if(size==20){
    Browser.msgBox("WARNING! Google Places, return 20 answers,that's max result!");
  }
  
  var sheet = ss.getActiveSheet();
  
  for(var a = 0; a<size; a++){
    sheet.appendRow([data.results[a].id,data.results[a].name,data.results[a].geometry.location.lat,data.results[a].geometry.location.lng,urlInit+
    data.results[a].geometry.location.lat+','+data.results[a].geometry.location.lng+'&layer=c&heading=235&pitch=10&sensor=false&cbll='+
    data.results[a].geometry.location.lat+','+data.results[a].geometry.location.lng]);
  }  
}
