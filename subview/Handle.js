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
    this.isStep = options.step 
    this.slider = slider
    this.observer = observer
  }
  
  getHandle1 () {
    return this.handle_1
  }

  getHandle2 () {
    return this.handle_2
  }

  update_handle (handle, spacing_target) {
    // let isVertical = (this.options.orientation == "vertical")
    this.isVertical? handle.style.bottom = `${spacing_target}px`:
                handle.style.left = `${spacing_target}px`;
  
    handle == this.handle_1 ? this.first_value = spacing_target : this.second_value = spacing_target
      this.observer.broadcast(this.first_value, this.second_value)
    
  }

  // initPosition (spacing_target1,spacing_target2) {
  //   console.log(this)
  //   let isVertical = (this.options.orientation == "vertical")
  //   if (isVertical) { 
  //     this.handle_1.style.bottom = `${spacing_target1}px`
  //     this.handle_2.style.bottom = `${spacing_target2}px`}
  //   else {
  //     this.handle_1.style.left = `${spacing_target1}px`;
  //     this.handle_2.style.left = `${spacing_target2}px`;
  //   }
  //   this.first_value = spacing_target1
  //   this.second_value = spacing_target2
  //   this.observer.broadcast(this.first_value, this.second_value)

  // }

  renderHandles () {
    // let isRange = (this.options.range == true)
    let arrOfHandles = [this.handle_1]
    if (this.isRange) arrOfHandles.push(this.handle_2)
    arrOfHandles.forEach (el=> {this.slider.append(el)})
  }

  updateStyle () {
    // let isVertical = (this.options.orientation == "vertical")
    // let isRange = (this.options.range == true)
    let half_width_handle
    this.isVertical? half_width_handle = this.handle_1.offsetHeight/2 : half_width_handle = this.handle_1.offsetWidth/2 
    console.log(half_width_handle) 
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
    // let isRange = (this.options.range == true)
    // let isVertical = (this.options.orientation == "vertical")
    // let isStep = (this.options.step)
    const slider = that.slider
    let size_slider = this.isVertical? slider.getBoundingClientRect().height : 
                                  slider.getBoundingClientRect().width

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
      let shiftX = event.clientX - handle.getBoundingClientRect().left
      let margin_handle 
    
      this.isVertical? margin_handle =  parseInt(getComputedStyle(handle).marginTop) :
                  margin_handle =  parseInt(getComputedStyle(handle).marginLeft)
    
      function MouseMove (event) {
        let target                   // значение по x||y от "начала" слайдера в px 
        let newRight = size_slider   // тригер для окончания движения ползунка
        let val1 = parsePxInValue(that.first_value,that.options,size_slider)  
        let val2 = parsePxInValue(that.second_value,that.options,size_slider)  
        that.isVertical? target = -(event.clientY - y  - margin_handle  - size_slider) :
                    target = event.clientX - x -shiftX - margin_handle - borderWidth_of_slider
    
                    that.isStep? moveIfStep() : moveIfNotStep()
        
        function moveIfNotStep() {
          if (handle == that.handle_1) {            // если first_handle
            if (that.isRange) newRight = that.second_value   // если range==true крайнее значение - правый ползунок
            if (target < 0) target = 0           
          } else {                                // если second_handle 
            if (target < that.first_value) target = that.first_value
          }
          if (target > newRight) {               // для обоих handle  
            target = newRight;
          }
          that.update_handle(handle,target)
        }
        function moveIfStep () {
          let step = that.step
          if (isNaN(step)) step = 1
          let target_up
          let target_down
    
          handle == that.handle_1? target_up = parseValueInPx(+val1+ +step, that.options,size_slider) : target_up = parseValueInPx(+val2+ +step, that.options,size_slider)
          handle == that.handle_1? target_down = parseValueInPx(+val1- +step, that.options,size_slider) : target_down = parseValueInPx(+val2- +step, that.options,size_slider)
    
          if(target_up> newRight) target_up = newRight // когда таргет выходит 
          if(target_down < 0) target_down = 0          // за пределы слайдера
    
          if(target>=target_up) {                     //перемещение если таргет больше величины шага
            if (that.isRange && handle == that.handle_1) newRight = that.second_value
            if (target_up> newRight) {target_up = newRight}
            that.update_handle(handle,target_up)
          }
          if (target<=target_down){                 //перемещение если таргет меньше величины шага
            if (that.isRange && handle == that.handle_1 && target_down<that.first_value) target_down = that.first_value
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