import Handle from './subview/Handle.js'
import RangeLine from './subview/RangeLine.js'
import Marks from './subview/Marks.js'
import Observer from './Observer.js'

import {parsePxInValue, parseValueInPx} from "./Helpers.js"


class View {
  constructor () {
    this.app = document.querySelector('.slider')
    this.input = this.createElement('input','slider-value')
    this.input.type = 'text'
    this.slider = this.createElement('div','range-slider')
    this.rangeLine = this.createElement('span', 'slider-range')
    this.label = this.createElement('span', 'value_label')
    this.marksContainer = this.createElement('div', 'marks')
    this.mark = this.createElement('span', 'mark')
    this.observer = new Observer()
  }

  createElement(tag, className) {
    const element = document.createElement(tag)
    if (className) element.classList.add(className)
    return element
  }

  renderDOM (options) {
    let that = this
    this.options = options
    this.handle = new Handle (this.options,this.slider,this.observer)
    this.rangeLine = new RangeLine (this.options, this.slider)
    this.marks = new Marks (this.options,this.slider)
    this.handle.renderHandles()
    this.rangeLine.renderLine()
    this.marks.renderMarks()
    this.app.append(this.input,this.slider)

    let isVertical = (this.options.orientation == "vertical")
    let size_slider = isVertical? this.slider.getBoundingClientRect().height : 
                                  slider.getBoundingClientRect().width
    this.first_value = parseValueInPx (this.options.values[0], this.options, size_slider)
    this.second_value = parseValueInPx (this.options.values[1], this.options, size_slider)
    
    updateStyles()
    addListeners()
    addObserver ()

    function updateStyles() {
      that.handle.updateStyle()
      that.rangeLine.updateStyle(that.handle.getHandle1())
    }

    function addListeners() {
      that.handle.addListener()
      that.handle.update_handle(that.handle.getHandle1(),that.first_value)
      that.handle.update_handle(that.handle.getHandle2(),that.second_value)
      that.rangeLine.update(that.first_value,that.second_value,that.handle.getHandle1())
    }
    function addObserver () {
      that.observer.subscribe(updateValue)

      function updateValue (val1,val2) {
          that.first_value = val1
          that.second_value = val2
          that.rangeLine.update(that.first_value,that.second_value,that.options,that.handle.getHandle1())
      }
    }
  }
}



export default View