import {Slider} from "./RangeSlider.js";

let slider = new Slider({
  min_value : 0,
  max_value : 1000,
  values : [222,444],
  separator : ' - ',
  modifier : 'R',
  range : true,  
  orientation : "vertical",
  label : true,
  step : '',  
  marks : [
        {
          value: 0,
          label: 0
        },
        {
          value: 1000,
          label: 1000
        },
        {
          value: 355,
          label: 355
          
        },
        {
          value: 888,
          label: 888
        },
      ]
})

slider.setOptions({
  min_value : 250,
  max_value : 1730,
  values : [269,662],
  separator : ' - ',
  range : true,  
  label : true,
  modifier : '$',
  step : '30',  
  marks : ''
})
slider.setOptions({
  min_value : 250,
  max_value : 1730,
  values : [269,662],
  separator : ' - ',
  range : true,  
  label : true,
  modifier : '$',
  step : '30',  
  marks : [
    {
      value: 553,
      label: 553
    }],
})

