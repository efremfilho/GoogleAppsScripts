// Receives {documentToPdf:documentToPdf,formResponse:formResponse} from generateDocument
function generatePdf(args) {
  var docblob = args.documentToPdf.getAs('application/pdf');
  var file = DriveApp.createFile(docblob);
  return {doc:args.documentToPdf,file:file,email:args.formResponse.getRespondentEmail()};
  
}
