    function parseValueInPx (val, obj_options,size_slider) {        // парсим полученое значение в px
    let {min_value, max_value} = obj_options
    return size_slider*(val-min_value) / (max_value-min_value)
  }
  
 function parsePxInValue (val,obj_options,size_slider) {
    let {min_value, max_value} = obj_options
    let value = max_value - min_value
    return (val/size_slider*value+min_value).toFixed(0)
  }

  export {parsePxInValue, parseValueInPx}