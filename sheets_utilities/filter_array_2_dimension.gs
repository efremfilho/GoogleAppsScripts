function filter_array_2_dimension(test_array) {
  let index_row = -1,
      arr_length_row = test_array ? test_array.length : 0,
      resIndex_row = -1,
      result = [];
  
  while (++index_row < arr_length_row) {
    let arr_length_column = test_array[index_row] ? test_array[index_row].length : 0,
        resIndex_column = -1,
        index_column = -1;
    
    while (++index_column < arr_length_column) {
      let value = test_array[index_row][index_column];
      
      if (value != "") {
        result.push(value);
       
      }
    }
  }
  
  return result;
}
