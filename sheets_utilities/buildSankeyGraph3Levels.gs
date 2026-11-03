function buildSankeyCode(level1,level2,level3) {
  let result = "<html>" +
    "<body>" +
      '<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>' +
        '<div id="sankey_multiple" style="width: 3000px; height: 1800px;"></div>' +
          '<script type="text/javascript">' + 
            'google.charts.load("current", {packages:["sankey"]});' +
              'google.charts.setOnLoadCallback(drawChart);' +
                'function drawChart() {' + 
                  'var data = new google.visualization.DataTable();' + 
                    "data.addColumn('string', 'From');" + 
                      "data.addColumn('string', 'To');" + 
                        "data.addColumn('number', 'Weight');"+
                          'data.addRows([';
  
  for(let i = 0; i < problems.length;i++){
      result += "[ '" + problems[i].toString().replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'') 
      + "', '" + jtbds[i].toString().replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'') + "', " + 1 + "],";
    if ( i > problems.length-1){
        result += "[ '" + jtbds[i].toString().replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'') 
        + "', '" + deliverables[i].toString().replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'') + "', " + 1 + "]";
    }else{

        result += "[ '" + jtbds[i].toString().replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'') 
        + "', '" + deliverables[i].toString().replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'') + "', " + 1 + "],";
    }
  }
  
  result += "]);" +
    "var options = {width: 1800,};" +
      "var chart = new google.visualization.Sankey(document.getElementById('sankey_multiple'));" +
        "chart.draw(data, options);" +
          "}</script></body></html>";
  return result;
}
