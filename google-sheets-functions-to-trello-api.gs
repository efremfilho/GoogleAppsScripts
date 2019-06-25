// How to generate a app key - https://trello.com/app-key/
// How to generate a app token - https://trello.com/1/authorize?expiration=never&scope=read,write,account&response_type=token&name=Server%20Token&key=[YOUR KEY]

//Create a board cloned from a template

function cloneBoard(board,member) {

  //Get name of board template 
  var url_source = 'https://api.trello.com/1/boards/'
  + board
  + '/name?key=[YOUR KEY]&token=[YOUR TOKEN]';
  var options_source =
      {
        "method"  : "GET",   
        "followRedirects" : true,
        "muteHttpExceptions": true
      };
  var response_source = UrlFetchApp.fetch(url_source, options_source);
  var json_source = response_source.getContentText();
  var data_source = JSON.parse(json_source);
  var name_source = data_source._value;
  
  
  // Create board
  var name = name_source + ' - ' + member; //name the new board
  var url = 'https://api.trello.com/1/boards/'
  + '?idBoardSource='
  + board
  + '&name='
  + name
  + '&keepFromSource=all' 
  + '&idOrganization=5afaf2fc5ce64b274bf9e1d4'
  + '&prefs_permissionLevel=public'
  + '&key=[YOUR KEY]&token=[YOUR TOKEN]';
  var options =
      {
        "method"  : "POST",   
        "followRedirects" : true,
        "muteHttpExceptions": true
      };
    
  var response = UrlFetchApp.fetch(url, options);
  var json = response.getContentText();
  Logger.log(response);
  var data = JSON.parse(json); 
  
  //Add member
  var add_member = adicionaMembro(data.id,member); //call addMember function
  return data.shortUrl; //return new trello board
}

//Add a member to a specific board

function addMember(board,member) {
  var url = 'https://api.trello.com/1/boards/'
  + board
  + '/members/' 
  + member
  + '?allowBillableGuest=false&type=normal&key=[YOUR KEY]&token=[YOUR TOKEN]';
  
  var options =
      {
        "method"  : "PUT",   
        "followRedirects" : true,
        "muteHttpExceptions": true
      };
    
  var response = UrlFetchApp.fetch(url, options);
  return 1;
}
