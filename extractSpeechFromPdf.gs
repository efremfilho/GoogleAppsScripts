// Used this script to transform from PDF to text - https://gist.github.com/mogsdad/e6795e438615d252584f?permalink_comment_id=1566944
// Used this file to this case - https://drive.google.com/file/d/18BuaRfXGHIQ3p8S7HTHBrYkUtNGI44zx/view?usp=sharing

function convertPDFToText (speaker){

  //name of file
  speaker = "[FILE NAME]";

  //get pdf 
  const pdfFile = DriveApp.getFilesByName("[YOUR PDF]").next();
  const blob = pdfFile.getBlob();

  // Get the text from pdf
  let filetext = pdfToText( blob, {keepTextfile: false} );

  // header and other elements to remove
  const header = filetext.substring(0,259); //header to remove
  const headerRegex = new RegExp(header, 'g');
  const footer = new RegExp(/Ata de Sessão Plenária Circunstanciada da 24(.*)/, 'g') //footer to remove
  filetext = filetext.replace(headerRegex, '');
  filetext = filetext.replace(footer, '');
  
  //get data by speaker
  const speakerREGEX = new RegExp(/(?<=[\r\n]PRESIDENTE \(DEPUTADO REGINALDO SARDINHA\))(.*?)(?=([\r\n]+DEPUTADO|[\r\n]+PRESIDENTE))/,'gms'); //gets from the name of speaker until find DEPUTADO OU PRESIDENTE
  const speaksFromSpeaker = filetext.match(speakerREGEX);

  //send to a Google sheet
  const ss = SpreadsheetApp.create('speeches-'+speaker);
  const ssURL = ss.getUrl();
  const sheet = ss.getSheets()[0];
  for (let i = 0; i < speaksFromSpeaker.length; i++) {
    sheet.appendRow([speaker, speaksFromSpeaker[i]]);
  }

  //show Spreadsheet url 
  Logger.log(ssURL);
}
