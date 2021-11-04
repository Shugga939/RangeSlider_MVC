import {parsePxInValue} from "../Helpers.js"

export default class Input {
  constructor (options,app) {
    this.options = options
    this.app = app
    this.input = document.createElement('input')
    this.input.classList.add('slider-value')
    this.input.type = 'text'
    this.isRange = (options.range == true)
  }

  renderInput () {
    this.app.append(this.input)
  }

  update (value_1, value_2, size_slider) {         
    let {separator = '', modifier = ''} = this.options
    let first_value = parsePxInValue(value_1, this.options,size_slider)   
    let second_value = parsePxInValue(value_2, this.options,size_slider)  
    console.log(value_1,size_slider)
  
    if (this.isRange) {
      this.input.value = first_value + modifier + separator + second_value + modifier
    } else {
      this.input.value = first_value + modifier
    }
    // update_labels_of_value (first_value, second_value)
  }

}