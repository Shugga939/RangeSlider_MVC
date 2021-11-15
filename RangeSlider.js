import Model from './Model.js'
import View from './View.js'
import Controller from './Controller.js'


export const Slider = function (options) {
  return new Controller (new Model(options), new View())
}
