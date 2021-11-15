import {parsePxInValue, parseValueInPx} from "../Helpers.js"

export default class Handle {
  constructor (options,slider,observer) {
    this.handle_1 = document.createElement('span')
    this.handle_1.classList.add('slider-handle')
    this.handle_2 = document.createElement('span')
    this.handle_2.classList.add('slider-handle')
    this.options = options
    this.isRange = (options.range == true)
    this.isVertical = (options.orientation == "vertical")
    this.step = options.step 
    this.slider = slider
    this.observer = observer
  }
  
  getHandle1 () {
    return this.handle_1
  }

  getHandle2 () {
    return this.handle_2
  }

  setOptions (options,first_value,second_value) {
    this.options = options
    this.isRange = (options.range == true)
    this.step = options.step 
    this.first_value = first_value
    this.second_value = second_value
    this.isRange? this.handle_1.after(this.handle_2) : this.handle_2.remove()
  }

  update_handle (handle, spacing_target) {
    this.isVertical? handle.style.bottom = `${spacing_target}px`:
                handle.style.left = `${spacing_target}px`;
  
    handle == this.handle_1 ? this.first_value = spacing_target : this.second_value = spacing_target
    this.observer.broadcast(this.first_value, this.second_value)
  }

  renderHandles () {
    let arrOfHandles = [this.handle_1]
    if (this.isRange) arrOfHandles.push(this.handle_2)
    arrOfHandles.forEach (el=> {this.slider.append(el)})
  }

  updateStyle () {
    let half_width_handle
    this.isVertical? half_width_handle = this.handle_1.offsetHeight/2 : half_width_handle = this.handle_1.offsetWidth/2 
    let borderWidth_of_slider = this.isVertical? this.slider.clientTop : this.slider.clientLeft 
    let margin = half_width_handle+borderWidth_of_slider

    if (this.isVertical) {                                    
      this.handle_1.style.marginBottom = `-${margin}px`
      if (this.isRange) this.handle_2.style.marginBottom = `-${margin}px`
    } else {
      this.handle_1.style.marginLeft = `-${margin}px`
      if (this.isRange) this.handle_2.style.marginLeft = `-${margin}px`
      
    }
  }
  addListener () {
    let that = this
    const slider = this.slider
    let size_slider = this.isVertical? slider.getBoundingClientRect().height : 
                                       slider.getBoundingClientRect().width
    let borderWidth_of_slider = this.isVertical? slider.clientTop : slider.clientLeft
    this.handle_1.addEventListener('mousedown', HandleMove)             
    if (this.isRange) this.handle_2.addEventListener('mousedown', HandleMove)

    function HandleMove (event) {
      event.preventDefault()
      event.stopPropagation()
      document.addEventListener('mousemove', MouseMove)
      document.addEventListener('mouseup', MouseUp)
    
      let handle = this
      let {x} = slider.getBoundingClientRect()
      let {y} = slider.getBoundingClientRect()
      let shift
      let margin_handle

      if (that.isVertical) {
        shift = (event.clientY - handle.getBoundingClientRect().top - handle.offsetHeight/2) || '0'
        margin_handle =  parseInt(getComputedStyle(handle).marginTop)
      } else {
        shift =  event.clientX - handle.getBoundingClientRect().left || handle.offsetHeight/2
        margin_handle =  parseInt(getComputedStyle(handle).marginLeft)
      }

      function MouseMove (event) {
        let target                  
        let newRight = size_slider   
        let val1 = parsePxInValue(that.first_value,that.options,size_slider)  
        let val2 = parsePxInValue(that.second_value,that.options,size_slider)  
        that.isVertical? target = -(event.clientY - y  - shift - margin_handle  - size_slider) :
                    target = event.clientX - x -shift - margin_handle - borderWidth_of_slider
                    
        that.step? moveIfStep() : moveIfNotStep()
        
        function moveIfNotStep() {
          if (handle == that.handle_1) {           
            if (that.isRange) newRight = that.second_value   
            if (target < 0) target = 0           
          } else {                               
            if (target < that.first_value) target = that.first_value
          }
          if (target > newRight) {             
            target = newRight;
          }
          that.update_handle(handle,target)
        }
        function moveIfStep () {
          let step = that.step
          let target_up
          let target_down
    
          handle == that.handle_1? target_up = parseValueInPx(+val1+ +step, that.options,size_slider) : target_up = parseValueInPx(+val2+ +step, that.options,size_slider)
          handle == that.handle_1? target_down = parseValueInPx(+val1- +step, that.options,size_slider) : target_down = parseValueInPx(+val2- +step, that.options,size_slider)
          
          if(target_up> newRight) target_up = newRight 
          if(target_down < 0) target_down = 0          
    
          if(target>=target_up) {                     
            if (that.isRange && handle == that.handle_1) newRight = that.second_value
            if (target_up> newRight) {target_up = newRight}
            that.update_handle(handle,target_up)
          }
          if (target<=target_down){               
            if (that.isRange && handle == that.handle_2 && target_down<that.first_value) target_down = that.first_value
            if(target_down<0) {target_down = 0}
            that.update_handle(handle,target_down)
          } 
        }
      }
    
      function MouseUp () {
        document.removeEventListener('mouseup', MouseUp)
        document.removeEventListener('mousemove', MouseMove)
      }
    }
  }
}