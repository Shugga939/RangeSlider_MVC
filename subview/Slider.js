import {parseValueInPx,parsePxInValue} from "../Helpers.js"
import Marks from "./Marks.js"

export default class Slider {
  constructor (options,app,observer) {
    this.options = options
    this.app = app
    this.observer = observer
    this.slider = document.createElement('div')
    this.slider.classList.add('range-slider')
    this.marks = new Marks (this.options,this)
    this.isRange = (options.range == true)
    this.isVertical = (options.orientation == "vertical")
    this.step = options.step 
  }

  renderSlider(handle) {
    this.app.append(this.slider)
    if (this.options.marks.length) {
      this.handle = handle
      this.marks.render(handle)
      this.marks.updateStyle()
    }
  }
  
  getDOM_element () {
    return this.slider
  }

  setOptions (options) {
    // let oldOPtions = this.options
    this.options = options
    this.isRange = (options.range == true)
    if (this.options.marks.length) {
      this.marks.delete()
      this.marks.setOptions(this.options)
      this.marks.render(this.handle)
      this.marks.updateStyle()
    } else {
      this.marks.delete()
    }
  }

  update (first_value, second_value) {
    this.first_value = first_value
    this.second_value = this.isRange? second_value : first_value
  }

  addListener (first_value, second_value,handle_obj) {
    const triggerEvent = new Event ('mousedown')
    const that = this
    this.first_value = first_value
    this.second_value = this.isRange? second_value : first_value
    this.first_handle = handle_obj.getHandle1()
    this.second_handle = handle_obj.getHandle2()
    let size_slider = that.isVertical? that.slider.getBoundingClientRect().height : 
                                      that.slider.getBoundingClientRect().width
    this.slider.addEventListener('mousedown', function (event) { 
      event.preventDefault()
      let {y} = that.slider.getBoundingClientRect() 
      let {x} = that.slider.getBoundingClientRect()  
      let target
    
      that.isVertical? target = -(event.clientY - y - size_slider) :
                  target = event.clientX - x
                  
      if (event.target != that.first_handle && event.target != that.second_handle) {  
        if (that.marks) moveToMark()     
        if (target < that.first_value) moveLeftHandle ()               
        if (target > that.first_value && target < that.second_value) moveBetweenHandle ()           
        if (target > that.second_value) moveRightHandle () 
      }
    
      function moveToMark () {
        let marks = that.marks.getDOM_element()
        if (event.target.parentElement == marks) {
          [...marks.children].forEach(element => {
            if (event.target == element) {
              target = parseValueInPx(element.dataset.value, that.options,size_slider)
            }
          })
        }
      }
      function moveLeftHandle () {
        if (target.toFixed(1)-2<0) target = 0
        if (that.step) parseTargetToStep ()
        handle_obj.update_handle(that.first_handle,target)
        that.first_handle.dispatchEvent(triggerEvent)
      }
      function moveBetweenHandle () { 
        if ((target - that.first_value) <= (that.second_value - target)) {  
          if (that.step) parseTargetToStep ()
          handle_obj.update_handle(that.first_handle,target)
          that.first_handle.dispatchEvent(triggerEvent)
        } else {
          if (that.step) parseTargetToStep ()
          handle_obj.update_handle(that.second_handle,target)
          that.second_handle.dispatchEvent(triggerEvent)
        }
      }
      function moveRightHandle () {
        if (target.toFixed(1) >= size_slider-1) {target = size_slider} 
        if (that.step) parseTargetToStep ()
        if (that.isRange) {
          handle_obj.update_handle(that.second_handle,target)
          that.second_handle.dispatchEvent(triggerEvent)
          } else {
          handle_obj.update_handle(that.first_handle,target)
          that.first_handle.dispatchEvent(triggerEvent)
        }
      }
      function parseTargetToStep () {
        let {min_value, max_value} = that.options
        let step = that.options.step
        let value = (max_value - min_value)/step
        let val2 = step/value                 
        let val3 = parsePxInValue(target,that.options,size_slider)/value                 
        target = parseValueInPx(Math.round(val3/val2)*step,that.options,size_slider)
      }
    })
  }
}