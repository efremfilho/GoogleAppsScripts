function formResponseToPdf() {
  sendEmail(generatePdf(generateDocument()));

// OR
//  var doc = generateDocument();
//  var pdf = generatePdf(doc);
//  sendEmail(pdf);
 }
