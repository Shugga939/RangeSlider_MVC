import Model from './Model.js'
import View from './View.js'
import Controller from './Controller.js'

let options = {
  min_value : 0,
  max_value : 40,
  values : [20,30],
  separator : ' - ',
  modifier : '₽',
  range : true,  
  // orientation : "vertical",
  // label : 'true',
  step : 10,
  marks : 's'
};

const app1 = new Controller (new Model(options), new View())

