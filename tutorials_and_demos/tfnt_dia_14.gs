function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Or DocumentApp or FormApp.
  ui.createMenu('Custom Menu')
      .addItem('First item', 'myFunction')
      .addSeparator()
      .addSubMenu(ui.createMenu('Sub-menu')
          .addItem('Second item', 'menuItem2'))
      .addToUi();
}

function menuItem1() {
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
     .alert('You clicked the first menu item!');
}

function menuItem2() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var valor = 'Valor a ser gravado';
  var range = Browser.inputBox('Insira a celula que quer inserir o valor (ex. "B2"):');
  sheet.getRange(range).setValue(valor);
}

function myFunction() {
  var recebeCNPJ = Browser.inputBox('Insira o CNPJ:');
  SpreadsheetApp.getActiveSheet().getActiveRange().setValue(consultarCNPJ('https://publica.cnpj.ws/cnpj/',recebeCNPJ));
}

function  limparCNPJ(cnpj) {
  cnpj = '' + cnpj;
  return cnpj.replace(/[^\d]+/g,'')
  
}

function consultarCNPJ(url,cnpj){
  url = url + cnpj;
  var response = UrlFetchApp.fetch(url);
  return JSON.parse(response).porte.descricao;
}

function executar() {
  var cnpjLimpinhoCoisaMaisLinda = limparCNPJ("43.19.083/00001-31");
  Logger.log(JSON.parse(consultarCNPJ("https://publica.cnpj.ws/cnpj/",cnpjLimpinhoCoisaMaisLinda)).razao_social);
  
}

function pegaFoto(){
  url = "https://sheet2api.com/v1/faGJgVvZSkeU/crossfit-gym";
  var response = UrlFetchApp.fetch(url);
  return JSON.parse(response)[1].Photo;
}
