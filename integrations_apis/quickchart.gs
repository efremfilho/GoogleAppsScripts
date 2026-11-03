//Google Sheet example - https://docs.google.com/spreadsheets/d/1pcOueX2u-XdmK2nzTnhLhkYVGHlRI0fVvCgR6HS2jw0/edit?usp=sharing

function quickchart(type_of_chart,labels_raw,data_raw) {
  let labels = build_labels(labels_raw),
      data = build_data(data_raw),
      url_base = "https://quickchart.io/chart?c=",
      url_data = "";
      
      switch (type_of_chart){
        case "bar":
        case "line":
        case "radar":
        case "pie":
        case "doughnut":
          url_data = "{type:'" 
          + type_of_chart + "'," 
          + "data:{labels:['"
          + labels + "'],datasets:" 
          + data + "}}";
          
          break;
          //        case "scatter":
          //        case "bubble":
          //        case "radialGauge":
          //          case "violin":
          //        case "sparkline":
          //          url_data = "{type:'" 
          //          + type_of_chart + "'," 
          //          + "datasets:" 
          //          + data + "}";
          //          
          //          break;
          
      }
      
  let url = url_base + JSON.stringify(url_data);
  
  return url.replace(/\"/g, '');  
}

function build_labels(test_array) {
  let index = -1,
      arr_length = test_array ? test_array.length : 0,
      resIndex = -1,
      result = "";
  
  while (++index < arr_length) {
    let value = test_array[index];
    
    if (value != "") {
        if(index == 0){
          result += value + "','";
        }else{
          if (index == arr_length - 1) {
              result += value;
          }else{
            result += value + "','";
          }
        }      
      }
  }
  
  return result;
}

function build_data(test_array) {
  let index_column = -1,
      arr_length_column = test_array[0] ? test_array[0].length : 0,
      arr_length_row = test_array ? test_array.length : 0,
      resIndex_column = -1,
      result = "";
  
  while (++index_column < arr_length_column) {
    let resIndex_row = -1,
        index_row = -1;
    
    while (++index_row < arr_length_row) {
      let value = test_array[index_row][index_column];
      
      if (value != "") {
        if(index_row == 0){
          if(index_column == 0){
            result += "[{label:'" + value + "',data:[";
          }else{
          result += "{label:'" + value + "',data:[";
          }
        }else{
          if (index_row == arr_length_row - 1) {
            if(index_column == arr_length_column - 1){
              result += value + "]}]";
            }else{
              result += value + "]},";
            }
          }else{
            result += value + ",";
          }
        }      
      }
    }
  }
  
  return result;
}

function buildDigraph(dataRaw) {
  
  //dataRaw = SpreadsheetApp.getActive().getSheetByName("Opportunity tree").getSheetValues(1, 1, 13, 2); //Example of data from pivot table with 2 lines dimesions and no total aggregators.
  let url = "https://quickchart.io/graphviz?graph=digraph{";
  let urlData = "";
  let node1 = "";
  for (let i = 1; i < dataRaw.length; i++){
    if (dataRaw[i][0]){
      node1 = dataRaw[i][0].replace(/[^\w\s]/gi, '');
    }
    urlData = urlData + "\n" + node1 + "->" + dataRaw[i][1].replace(/[^\w\s]/gi, '') + ";";
  }
  return (url + urlData.split(' ').join('_') + "}");
}

