import {Slider} from "./RangeSlider.js";

let slider = new Slider({
  min_value : 0,
  max_value : 40,
  values : [15,30],
  separator : ' - ',
  modifier : 'R',
  range : true,  
  orientation : "vertical",
  label : '',
  step : '',  
  marks : ''
})

slider.setOptions({
  min_value : 250,
  max_value : 730,
  values : [269,662],
  separator : ' - ',
  range : true,  
  modifier : '$',
  step : '30',  
})

