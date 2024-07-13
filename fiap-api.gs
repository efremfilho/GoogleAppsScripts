function doGet(e) {
  var responseData = {
    message: 'faço coisas sofisitcados no script',
    //parameters: e.parameter.file_path
  };

  var response = ContentService.createTextOutput(JSON.stringify(responseData));
  response.setMimeType(ContentService.MimeType.JSON);

  return response;
}  
