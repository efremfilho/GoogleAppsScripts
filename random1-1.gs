function radom1_1() {
  const sheet = SpreadsheetApp.getActive().getSheetByName("1-1");
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();
  const numberOfIteractions = sheet.getRange(1, 1).getValue();
  let row = 3;
  const firstColumn = 2;
  let counter = 1;
  let people = sheet.getSheetValues(row-1, 1, lastRow-1, 1)

  sheet.getRange(row-1, 1, lastRow-1, 1).clear();
  sheet.getRange(row-1, 1, lastRow-1, 1).setValues(shuffle(people));
  
  for(let j = firstColumn; j <= lastColumn;j++) {
    counter = sheet.getRange(row, j-1).getValue()+1;
    for (let i = row; i <= lastRow; i++) {
      if (counter <= numberOfIteractions){ 
        sheet.getRange(i, j).setValue(counter++);
      }else{
        counter = 1;
        sheet.getRange(i, j).setValue(counter++);
      }
    }
    counter = ++row; 
  }
}

//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

