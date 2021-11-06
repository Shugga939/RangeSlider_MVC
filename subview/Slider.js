import {parseValueInPx,parsePxInValue} from "../Helpers.js"

export default class Slider {
  constructor (options,app,observer) {
    this.observer = observer
    this.options = options
    this.slider = document.createElement('div')
    this.slider.classList.add('range-slider')
    this.app = app
    this.isRange = (options.range == true)
    this.isVertical = (options.orientation == "vertical")
    this.step = options.step 
  }

  renderSlider() {
      this.app.append(this.slider)
  }
  
  getDOM_element () {
    return this.slider
  }

  addListener (first_value, second_value,handle_ojb) {
    const that = this
    this.first_value = first_value
    this.second_value = second_value
    this.first_handle = handle_ojb.getHandle1()
    this.second_handle = handle_ojb.getHandle2()
    let size_slider = that.isVertical? that.slider.getBoundingClientRect().height : 
                                      that.slider.getBoundingClientRect().width
    this.slider.addEventListener('mousedown', function (event) { 
      event.preventDefault()
      let {y} = that.slider.getBoundingClientRect() 
      let {x} = that.slider.getBoundingClientRect()  
      let target
      // const marks = slider.querySelector('.marks')
    
      that.isVertical? target = -(event.clientY - y - size_slider) :
                  target = event.clientX - x
                  
      if (event.target != that.first_handle && event.target != that.second_handle) {  
        // if (marks) moveToMark()                                      
        if (target < first_value) moveLeftHandle ()               
        if (target > first_value && target < second_value) moveBetweenHandle ()           
        if (target > second_value) moveRightHandle ()             
      }
    
      // function moveToMark () {
      //   if (event.target.parentElement == marks) {
      //     [...marks.children].forEach(element => {
      //       if (event.target == element) {
      //         target = parseValueInPx(element.dataset.value, options)
      //         if (!isRange) second_value = target
      //       }
      //     })
      //   }
      // }
      function moveLeftHandle () {
        if (target.toFixed(1)-2<0) target = 0
        if (that.step) parseTargetToStep ()
        handle_ojb.update_handle(that.first_handle,target)

      }
      function moveBetweenHandle () {
        if (target - first_value < -(target - second_value)) {  
          if (that.step) parseTargetToStep ()
          handle_ojb.update_handle(that.first_handle,target)

        } else {
          if (that.step) parseTargetToStep ()
          handle_ojb.update_handle(that.second_handle,target)
        }
      }
      function moveRightHandle () {
        if (target.toFixed(1) >= size_slider-1) {target = size_slider} 
        if (that.step) parseTargetToStep ()
        if (that.isRange) {
          handle_ojb.update_handle(that.second_handle,target)       
          } else {
          handle_ojb.update_handle(that.first_handle,target)
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