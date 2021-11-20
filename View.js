import Slider from './subview/Slider.js'
import Input from './subview/Input.js'
import Handle from './subview/Handle.js'
import RangeLine from './subview/RangeLine.js'
import Observer from './Observer.js'

import {parseValueInPx} from "./Helpers.js"


class View {
  constructor () {
    this.app = document.querySelector('.slider')
    this.observer = new Observer()
  }

  update(options) {
    this.options = options
    this.initValues()
    this.initStyles()
    this.slider_object.setOptions(options)
    this.handle.setOptions(options, this.first_value, this.second_value)
    this.rangeLine.setOptions(options)
    this.input.setOptions(options)
    this.handle.update_handle(this.handle.getHandle1(), this.first_value)
    this.handle.update_handle(this.handle.getHandle2(), this.second_value)
  }
  
  renderDOM (options) {
    this.options = options
    this.slider_object = new Slider (this.options, this.app,this.observer)
    this.slider = this.slider_object.getDOM_element()
    this.input = new Input (this.options, this.app)
    this.handle = new Handle (this.options,this.slider,this.observer)
    this.rangeLine = new RangeLine (this.options, this.slider)
    this.input.renderInput()
    this.handle.renderHandles()
    this.rangeLine.renderLine()
    this.slider_object.renderSlider(this.handle)
  }
  
  initValues() {
    let isVertical = (this.options.orientation == "vertical")
    this.size_slider = isVertical? this.slider.getBoundingClientRect().height : 
                                   this.slider.getBoundingClientRect().width
    this.first_value = parseValueInPx (this.options.values[0], this.options, this.size_slider)
    this.second_value = parseValueInPx (this.options.values[1], this.options, this.size_slider)
  }

  initStyles () {
    this.handle.updateStyle()
    this.rangeLine.updateStyle(this.handle.getHandle1())
  }

  initScripts () {
    const that = this
    addListeners()
    addObserver()

    function addListeners() {
      that.handle.addListener()
      that.slider_object.addListener(that.first_value,that.second_value,that.handle)
      that.input.addListener(that.handle,that.size_slider)
      that.handle.update_handle(that.handle.getHandle1(),that.first_value)
      that.handle.update_handle(that.handle.getHandle2(),that.second_value)
      that.rangeLine.update(that.first_value,that.second_value,that.handle.getHandle1())
      that.input.update(that.first_value,that.second_value,that.size_slider)
    }

    function addObserver () {
      that.observer.subscribe(updateValue)

      function updateValue (val1,val2) {
          that.first_value = val1
          that.second_value = val2
          that.rangeLine.update(that.first_value,that.second_value,that.options)
          that.input.update(that.first_value,that.second_value,that.size_slider)
          that.slider_object.update(that.first_value,that.second_value)
      }
    }
  }
}

export default View