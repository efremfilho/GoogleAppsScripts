function createDigitalSignature(email) { 
  var randNumber = Math.floor(Math.random() * (10000000 - 1000000 + 1)) + 1000000;
  var digitalSignature = email.substring(0,email.indexOf("@"))+ "-" 
             + email.substring(email.indexOf("@")+1, email.length).substring(0,email.substring(email.indexOf("@")+1, email.length).indexOf("."))
             + "-" + randNumber;
  return(digitalSignature);
}
