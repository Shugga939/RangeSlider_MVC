import {parseValueInPx,parsePxInValue} from "../Helpers.js"

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
  
  setOptions (options) {
    this.options = options
    this.isRange = (options.range == true)
  }

  update (value_1, value_2, size_slider) {         
    let {separator = '', modifier = ''} = this.options
    let first_value = parsePxInValue(value_1, this.options,size_slider)   
    let second_value = parsePxInValue(value_2, this.options,size_slider)  
  
    if (this.isRange) {
      this.input.value = first_value + modifier + separator + second_value + modifier
    } else {
      this.input.value = first_value + modifier
    }
  }

  addListener (handle,size_slider) {
    this.handle = handle
    this.size_slider = size_slider
    const that = this
    this.first_handle = handle.getHandle1()
    this.second_handle = handle.getHandle2()

    this.input.addEventListener('change', function (event) {
      let val =  that.input.value;
      let {min_value, max_value, separator = '', modifier = ''} = that.options       
      let [val1, val2] = parseValue(val)                         
      if (val1 > val2 || val2 < val1) [val1,val2] = [val2,val1]
      handle.update_handle(that.first_handle, parseValueInPx(val1,that.options,size_slider))
        if (that.isRange) {
          handle.update_handle(that.second_handle, parseValueInPx(val2,that.options,size_slider))
          that.input.value = val1 + modifier + separator + val2 + modifier 
        } else {                                                             
          that.input.value = val1 + modifier
        }
    
      function parseValue (value) {                   
        let value1 = parseInt(value)                   
        let value2;
    
        if (separator && that.isRange) {                             
          value1 = parseInt(value.split(separator)[0])
          value2 = parseInt(value.split(separator)[1])
        } else if (modifier && that.isRange) {                         
          value1 = parseInt(value.split(modifier)[0])
          value2 = parseInt(value.split(modifier)[1])
        } else if (!that.isRang) {
          value1 = parseInt(value)
        }
    
        if (isNaN(value1)) value1 = min_value            
        if (isNaN(value2)) value2 = value1                
        return [checkMinMax(value1,min_value,max_value),   
                checkMinMax(value2,min_value,max_value)]
      }
    
      function checkMinMax (val, minValue,maxValue) {  
        if (val < minValue) return minValue
        if (val > maxValue) return maxValue
        return val
      }
    })
  }
}