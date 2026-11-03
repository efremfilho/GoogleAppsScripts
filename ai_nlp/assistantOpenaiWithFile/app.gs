function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}

function uploadFileAndProcess(fileContent, fileName, messageContent) {
  const scriptProperties = PropertiesService.getScriptProperties();
  const apiKey = scriptProperties.getProperty('OPENAI_API_KEY');

  // Decode the file content from Base64 to binary
  const decodedFileContent = Utilities.base64Decode(fileContent.split(',')[1]);

  const boundary = '---011000010111000001101001';
  const payload = 
    '--' + boundary + '\r\n' +
    'Content-Disposition: form-data; name="purpose"\r\n\r\n' +
    'assistants\r\n' +
    '--' + boundary + '\r\n' +
    'Content-Disposition: form-data; name="file"; filename="' + fileName + '"\r\n' +
    'Content-Type: application/octet-stream\r\n\r\n' +
    Utilities.newBlob(decodedFileContent).getBytes() + '\r\n' +
    '--' + boundary + '--\r\n';

  const options = {
    'method': 'post',
    'contentType': 'multipart/form-data; boundary=' + boundary,
    'headers': {
      'Authorization': 'Bearer ' + apiKey,
      'OpenAI-Beta': 'assistants=v2'
    },
    'payload': Utilities.newBlob(payload).getBytes(),
    'muteHttpExceptions': true
  };
  
  const response = UrlFetchApp.fetch('https://api.openai.com/v1/files', options);
  const jsonResponse = JSON.parse(response.getContentText());

  if (jsonResponse.error) {
    return { error: jsonResponse.error.message };
  }

  // Now that we have the file ID, we can call the previous logic
  const fileId = jsonResponse.id;
  return processRequest(fileId, messageContent);
}



function processRequest(fileId, messageContent) {
  try {
    const threadId = createThreadWithMessageAndAttachment(fileId, messageContent);
    const runResponse = createRunThread(threadId);

    Logger.log("threadId = " + threadId + " and run = " + JSON.stringify(runResponse));

    let messages;
    let hasMore = true;

    Utilities.sleep(10000);  // Aguarda 10 segundos antes da próxima chamada

    while (hasMore) {
      messages = retrieveMessagesFromThread(threadId);
      hasMore = messages['has_more'];

      if (hasMore) {
        Utilities.sleep(10000);  // Aguarda 10 segundos antes da próxima chamada
        Logger.log("esperou 10 segundos");
      }
    }

    return messages;  // Retorna as mensagens como resposta
  } catch (e) {
    return { error: e.toString() };  // Retorna o erro, se ocorrer
  }
}

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}

function uploadFileAndProcess(fileContent, fileName, messageContent) {
  const scriptProperties = PropertiesService.getScriptProperties();
  const apiKey = scriptProperties.getProperty('OPENAI_API_KEY');

  // Decode the file content from Base64 to binary
  const decodedFileContent = Utilities.base64Decode(fileContent.split(',')[1]);

  const boundary = '---011000010111000001101001';
  const payload = 
    '--' + boundary + '\r\n' +
    'Content-Disposition: form-data; name="purpose"\r\n\r\n' +
    'assistants\r\n' +
    '--' + boundary + '\r\n' +
    'Content-Disposition: form-data; name="file"; filename="' + fileName + '"\r\n' +
    'Content-Type: application/octet-stream\r\n\r\n' +
    Utilities.newBlob(decodedFileContent).getBytes() + '\r\n' +
    '--' + boundary + '--\r\n';

  const options = {
    'method': 'post',
    'contentType': 'multipart/form-data; boundary=' + boundary,
    'headers': {
      'Authorization': 'Bearer ' + apiKey,
      'OpenAI-Beta': 'assistants=v2'
    },
    'payload': Utilities.newBlob(payload).getBytes(),
    'muteHttpExceptions': true
  };
  
  const response = UrlFetchApp.fetch('https://api.openai.com/v1/files', options);
  const jsonResponse = JSON.parse(response.getContentText());

  if (jsonResponse.error) {
    return { error: jsonResponse.error.message };
  }

  // Now that we have the file ID, we can call the previous logic
  const fileId = jsonResponse.id;
  return processRequest(fileId, messageContent);
}



function processRequest(fileId, messageContent) {
  try {
    const threadId = createThreadWithMessageAndAttachment(fileId, messageContent);
    const runResponse = createRunThread(threadId);

    Logger.log("threadId = " + threadId + " and run = " + JSON.stringify(runResponse));

    let messages;
    let hasMore = true;

    Utilities.sleep(10000);  // Aguarda 10 segundos antes da próxima chamada

    while (hasMore) {
      messages = retrieveMessagesFromThread(threadId);
      hasMore = messages['has_more'];

      if (hasMore) {
        Utilities.sleep(10000);  // Aguarda 10 segundos antes da próxima chamada
        Logger.log("waited 10 sec");
      }
    }

    return messages;  // Retorna as mensagens como resposta
  } catch (e) {
    return { error: e.toString() };  // Retorna o erro, se ocorrer
  }
}
