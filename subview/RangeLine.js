export default class RangeLine {
  constructor (options,slider) {
    this.rangeLine = document.createElement('span')
    this.rangeLine.classList.add('slider-range')
    this.isRange = (options.range == true)
    this.isVertical = (options.orientation == "vertical")
    this.slider = slider
  }

  renderLine () {
    this.slider.append(this.rangeLine)
  }

  update (first_value,second_value) {
    let that = this
    this.isRange? update_if_isRange() : update_if_notRange()

    function update_if_isRange () {
      if (that.isVertical) {
        that.rangeLine.style.height = `${second_value - first_value}px`
        that.rangeLine.style.bottom = `${first_value - that.borderWidth_of_slider}px`
      } else {
        that.rangeLine.style.width = `${second_value - first_value}px`
        that.rangeLine.style.left = `${first_value + that.half_width_handle-parseInt(getComputedStyle(that.slider).paddingLeft)}px`
      }
    }
    function update_if_notRange () {
      if (that.isVertical) {
        that.rangeLine.style.height = `${first_value + parseInt(getComputedStyle(that.slider).paddingTop)}px`
        that.rangeLine.style.bottom = `${-that.borderWidth_of_slider}px`
      } else {
        that.rangeLine.style.width = `${first_value + parseInt(getComputedStyle(that.slider).paddingLeft)}px`
        that.rangeLine.style.left = `${that.half_width_handle-parseInt(getComputedStyle(that.slider).paddingLeft)}px`
      }
    }
  }

  updateStyle (handle) {
    this.half_width_handle = handle.offsetWidth/2   
    this.borderWidth_of_slider = this.isVertical? this.slider.clientTop : this.slider.clientLeft 
    let margin = this.half_width_handle + this.borderWidth_of_slider

    this.isVertical? this.rangeLine.style.marginTop= `-${margin}px` :
                this.rangeLine.style.marginLeft = `-${margin}px`
    
  }
}