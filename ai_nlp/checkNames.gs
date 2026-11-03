function checkNames() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var baseSheet = ss.getSheetByName("database");
  var referenceSheet = ss.getSheetByName("reference_data");

  // Get data from 'reference_data' sheet
  var lastRowReference = referenceSheet.getLastRow();
  if (lastRowReference < 2) {
    Logger.log("No reference data found.");
    return;
  }
  var referenceData = referenceSheet.getRange(2, 1, lastRowReference - 1, 4).getValues();
  // We need columns A (index 0), B (index 1), and D (index 3)
  var referenceList = referenceData.map(function(row) {
    return "Name: " + row[0] + "; Info1: " + row[1] + "; Info2: " + row[3];
  });

  // Get data from 'database' sheet
  var lastRowBase = baseSheet.getLastRow();
  if (lastRowBase < 2) {
    Logger.log("No base data found.");
    return;
  }
  var lastColumnBase = baseSheet.getLastColumn();
  var baseData = baseSheet.getRange(2, 1, lastRowBase - 1, lastColumnBase).getValues();

  // Retrieve OpenAI API key from script properties
  var apiKey = PropertiesService.getScriptProperties().getProperty('OPENAI_API_KEY');
  if (!apiKey) {
    Logger.log("OpenAI API key not found in script properties.");
    return;
  }
  var apiUrl = "https://api.openai.com/v1/chat/completions";

    for (var i = 0; i < baseData.length; i++) { // Adjust the range or loop through the whole data
    var transcribedName = baseData[i][7]; // Column H (index 7)
    var cellN = baseSheet.getRange(i + 2, 14).getValue(); // Column N (index 14)
    var cellO = baseSheet.getRange(i + 2, 15).getValue(); // Column O (index 15)

    // Skip the row if columns N and O are already filled
    if (cellN && cellO) {
      Logger.log("Skipping row " + (i + 2) + " because columns N and O are already filled.");
      continue;
    }

    if (!transcribedName) {
      // Skip if transcribedName is empty
      continue;
    }

    // Construct the messages for chat completion
    var messages = [
      {
        "role": "system",
        "content": "You are an assistant helping to match transcribed names to the correct ones based on a reference list."
      },
      {
        "role": "user",
        "content": `We are checking transcribed names against a reference list. The transcription may not be accurate, and we need to find the correct name based on the provided list.

Here is the reference list:

---- Start of reference list
${referenceList.join('\n')}
---- End of reference list

---- Instruction
The transcribed name is: ${transcribedName}
We are evaluating if the transcription was incorrect, and we need to find the name that most closely matches the transcribed name based on the list above. The person may not know the full name or may give an incomplete or incorrect version. In cases where we are uncertain, return "undefined". For confident matches, return the correct name and the confidence level: certain, high, medium, low, or uncertain. If the response is "undefined" but you are confident about that answer, set confidence as high. Respond in JSON format with the variables "name" and "confidence". You cannot create new names outside the list, and the names must match exactly as in the list. Always return the names in uppercase.
--- end of prompt`
      }
    ];

    // Ensure the prompt does not exceed the token limit
    var totalLength = messages.reduce((sum, msg) => sum + msg.content.length, 0);
    Logger.log("Prompt size: " + totalLength);

    if (totalLength > 100000) {
      Logger.log("Prompt too long for row " + (i + 2));
      continue;
    }

    // Prepare the payload for OpenAI API
    var payload = {
      "model": "gpt-4o",  
      "response_format": { "type": "json_object" },
      "messages": messages
    };

    var options = {
      "method": "post",
      "headers": {
        "Authorization": "Bearer " + apiKey,
        "Content-Type": "application/json"
      },
      "payload": JSON.stringify(payload),
      "muteHttpExceptions": true // To get error messages
    };

    try {
      // Make the API call
      var response = UrlFetchApp.fetch(apiUrl, options);

      // Check the response code
      if (response.getResponseCode() !== 200) {
        Logger.log("API error for row " + (i + 2) + ": " + response.getContentText());
        continue;
      }

      // Parse the response
      var responseData = JSON.parse(response.getContentText());

      // Get the assistant's reply
      var completionText = responseData.choices[0].message.content.trim();

      var name = '';
      var confidence = '';

      // Attempt to parse the assistant's reply
      try {
        var result = JSON.parse(completionText);
        name = result.name || '';
        confidence = result.confidence || '';
      } catch (e) {
        // If parsing fails, write the whole response to 'name' and leave 'confidence' empty
        name = completionText;
        confidence = '';
      }

      // Write back to 'database' sheet
      baseSheet.getRange(i + 2, 14).setValue(name); // Column N
      baseSheet.getRange(i + 2, 15).setValue(confidence);  // Column O

    } catch (e) {
      // Handle errors
      Logger.log("Error for row " + (i + 2) + ": " + e);
    }

    // Optionally add a sleep to avoid rate limiting
    Utilities.sleep(1000);
  }
}

// Function to set environment variables (API key) -- separate in other file and run first
function setEnvironmentVariable() {
  const scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperty('OPENAI_API_KEY', 'sk-proj-[YOUR-TOKEN]');
}
