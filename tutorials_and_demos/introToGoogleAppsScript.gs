function exemplificar_conceito() {
  // Declaração de uma variável com um valor numérico
  var exemplo = 10000.51;
  Logger.log('O valor inicial de exemplo é: ' + exemplo);

  // Alteração do valor da variável para uma string
  exemplo = 'efrem';
  Logger.log('O valor de exemplo após mudança para string é: ' + exemplo);

  // Concatenando um número à string
  exemplo = exemplo + 5;
  Logger.log('O valor de exemplo após concatenação é: ' + exemplo);

  // Redefinindo a variável para um número e depois para uma string
  exemplo = 5;
  exemplo = 'efrem_';
  Logger.log('O valor de exemplo após redefinição é: ' + exemplo);

  // Exemplo de condição
  if (exemplo == 'efrem') {
    exemplo = exemplo + ' maranhao';
  } else {
    exemplo = exemplo + '-';
    if (parseInt(exemplo, 10)) {
      exemplo = exemplo + ' silva';
    }
  }
  Logger.log('O valor de exemplo após a condição é: ' + exemplo);

  // Exemplo de loop
  for (var i = 1; i < 100; i = i + 0.6) {
    if (Math.floor(i) == Math.round(i)) {
      Logger.log('O valor arredondado é ' + Math.round(i) + ' e eu contei ' + i);
    } else {
      Logger.log('O valor arredondado é ' + Math.round(i) + ' e eu não contei o decimal ' + i);
    }
  }

  // Exemplo de chamada a uma API Externa
  var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-7.136722,-34.845641&radius=20000&types=restaurant&key=[YOUR-KEY]';
  var response = UrlFetchApp.fetch(url);
  var json = response.getContentText();
  var data = JSON.parse(json);
  
  Logger.log('Número de resultados: ' + data.results.length);
  
  for (var a = 0; a < data.results.length; a++) {
    Logger.log('O lugar se chama: ' + data.results[a].name + 
    '\nE tem coordenadas (latitude, longitude) em: ' + 
    data.results[a].geometry.location.lat + ',' + data.results[a].geometry.location.lng);
  }
}
