function exemplificar_conceito() {
  
  var exemplo = 10000.51;
  
  //Logger.log('o valor de exemplo é '+ exemplo);
  
  exemplo = 'efrem';
  exemplo = exemplo + 5;
  
  //Logger.log('o valor de exemplo é '+ exemplo);
  
  exemplo = 5;
  exemplo = 'efrem_';
  
  //Logger.log('o valor de exemplo é '+ exemplo);
 
  //Exemplo do condição 

  if(exemplo == 'efrem'){
    exemplo = exemplo + ' maranhao';
  } else {
    exemplo = exemplo + "-";
    if(parseInt(exemplo,10)) {
      exemplo = exemplo + ' silva';
    }
  }
  
  //Logger.log('o valor de exemplo é '+ exemplo);
  
  // Exemplo de loop

  for (var i = 1; i < 100; i = i + .6) {
    if (Math.floor(i) == Math.round(i)) {
      //Logger.log('o round é ' + Math.round(i) + ' e eu contei '+ i);
    } else {
      //Logger.log('o round é ' + Math.round(i) + ' e eu não contei o decimal' + i);
    }
  }
  
  //Exemplo API Externa

  var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-7.136722,-34.845641&radius=20000&types=restaurant&key=[YOUR-KEY]';
  var response = UrlFetchApp.fetch(url);
  var json = response.getContentText();
  var data = JSON.parse(json);
  
  //Logger.log(data.results.length);
  
  for(var a = 0; a<data.results.length; a++){
    //Logger.log(data.results[0].vicinity);
    Logger.log('O lugar se chama: '+data.results[a].name + 
    ' \ne tem coordenadas (latitude,longitude) em: '+ 
    data.results[a].geometry.location.lat+','+data.results[a].geometry.location.lng);
  }

 
}
