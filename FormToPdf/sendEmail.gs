// Receives {doc:args.documentToPdf,file:file,email:args.formResponse.getRespondentEmail()} from generatePdf
function sendEmail(args) {
  var email = args.email;
  
  //Send email with shareable link
  DriveApp.getFileById(args.file.getId()).setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.VIEW);
  DriveApp.getFileById(args.doc.getId()).setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.VIEW);
  url = args.file.getUrl();
  urlDoc = args.doc.getUrl();
  GmailApp.sendEmail(email, 'Link to download ' + args.file.getName(), 'Just download - ' + url + "\n" + "Or get Doc format - " + urlDoc);


}
