function sendEmail(email,name) {
  // Docs and Example of payload - https://sendgrid.com/docs/api-reference/
  
  var subject = '[SUBJECT]';
  var emailFrom = '[EMAIL FROM]';
  var nameToAppear = '[NAME FROM]';
  var emailToReply = '[EMAIL TO REPLY]'; 
  var url = 'https://api.sendgrid.com/v3/mail/send';
  var apikey = '[YOUR API KEY]';
  var templateId = '[YOUR TEMPLATE ID]';  
  var payload = '{"personalizations":[{"to":[{"email":"' + email + '",'
              + '"name":"' + name + '"}],' 
              + '"subject":"' + subject + '"}],"' 
              + 'from":{"email":"' + emailFrom + '",'
              + '"name":"'+ nameToAppear + '"},'
              + '"reply_to":{"email":"'+ emailToReply + '",'
              + '"name":"' + nameToAppear + '"},'
              + '"template_id":"' + templateId + '"}';
  Logger.log(payload);
  var options =
      {
        'method'  : 'POST',   
        'followRedirects' : true,
        'muteHttpExceptions': true,
        "headers": {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + apikey
        },
        'payload': payload
        };
    
  var response = UrlFetchApp.fetch(url, options);
  Logger.log(response);
}
