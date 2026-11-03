function getFeeFromPagseguro(id) {
  var url = 'https://ws.pagseguro.uol.com.br/v2/transactions';
  var token = '[YOUR TOKEN]';  
  var email = '[YOUR EMAIL]';    
  var response = UrlFetchApp.fetch(url + '/?email='+ email 
                                   + '&token=' + token
                                   + "&reference=" + id);
  var xml = response.getContentText();
  var feeAmount = xml.substring(xml.lastIndexOf("<feeAmount>") + 11
                                ,xml.lastIndexOf("</feeAmount>"));
  return feeAmount;
}
