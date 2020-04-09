function generateToken() {
  var url = "https://api.paypal.com/v1/oauth2/token";
  var options =
      {
        'method'  : 'POST',   
        "headers": {
          "Accept": "application/json",
          "Accept-Language": "en_US",
          "Authorization": "Basic [YOUR AUTHORIZATION]",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "payload": "grant_type=client_credentials"
        };
  
  var response = UrlFetchApp.fetch(url, options);
  var json = response.getContentText();
  var data = JSON.parse(json);
  
  return data.access_token;
  
}
