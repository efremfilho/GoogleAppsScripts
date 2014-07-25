function exemplifcar_conceito() {
  
  var exemplo = 10000.51;
  
  Logger.log('o valor de exemplo é '+exemplo);
  
  exemplo = 'efrem';
  //exemplo = exemplo + 5;
  
  Logger.log('o valor de exemplo é '+exemplo);
  
  exemplo = 5;
  exemplo = 'efrem';
  
  Logger.log('o valor de exemplo é '+exemplo);
 
 //Exemplo do condição 

  if(exemplo == 'efrem'){
    exemplo = exemplo + ' maranhao';
  } else {
    exemplo = exemplo + 'silva';
  }
  
  Logger.log('o valor de exemplo é '+exemplo);



// Exemplo de loop

  for (var i = 1; i <= 100; i = i + 10) {
    Logger.log('contei '+i);
  }


//Exemplo API Externa

  var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-7.136722,-34.845641&radius=20000&types=restaurant&key=AIzaSyDuik6s7UgJkKtYfigE5umlRCYer8FIK3k';
  var response = UrlFetchApp.fetch(url);
  var json = response.getContentText();
  var data = JSON.parse(json);
  
  for(var a = 0; a<data.results.length; a++){;
  Logger.log('O lugar se chama: '+data.results[a].name + ' \ne tem coordenadas (latitude,longitude) em: '+data.results[a].geometry.location.lat+','+data.results[a].geometry.location.lng);
  }


}
