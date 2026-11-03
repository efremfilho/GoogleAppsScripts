function getDataFromPaypal(id,initialDate,finalDate,apiKey) { //apiKey generate by 'generateToken' function
  var url = "https://api.paypal.com/v1/reporting/transactions"
  + "?start_date=" + initialDate 
  + "&end_date=" + finalDate 
  + "&fields=all";  
  var options =
      {
        'method'  : 'GET',   
        "headers": {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + apiKey
        }
      };
  
  var response = UrlFetchApp.fetch(url, options);
  var json = response.getContentText();
  var data = JSON.parse(json);
  
  for (var i = 0; i < Object.keys(data.transaction_details).length; i++){
    if (data.transaction_details[i].transaction_info.invoice_id == id){
      return (-(data.transaction_details[i].transaction_info.fee_amount.value)); //comes a negative number
    }
  }
  return "didn't work :(";
}
