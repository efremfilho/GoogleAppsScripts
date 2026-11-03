function generateDocument() {
  var form = FormApp.getActiveForm();
  var formResponses = form.getResponses();
  var lastResponse = formResponses.length - 1;
  var formResponse = formResponses[lastResponse];
  var itemResponses = formResponse.getItemResponses();
  
  //Create document
  var documentToPdf = DocumentApp.create('Document-' + (lastResponse + 1).toString());
  var body = documentToPdf.getBody();
  for (var j = 0; j < itemResponses.length; j++) {
    var itemResponse = itemResponses[j];
    body.appendParagraph('Response #' + (lastResponse + 1).toString() 
                        + ' to the question "' + itemResponse.getItem().getTitle() 
                        + '" was "' + itemResponse.getResponse() + '"');
  }
  documentToPdf.saveAndClose();
  return {documentToPdf:documentToPdf,formResponse:formResponse};
}
