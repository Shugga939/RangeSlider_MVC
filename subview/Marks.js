import {parseValueInPx} from "../Helpers.js"
export default class Marks {
  constructor (options,slider) {
    this.options = options
    this.slider = slider
    this.marks = document.createElement('div')
    this.marks.classList.add('marks')
  }

  render (handle) {
    this.handle = handle
    let slider = this.slider.getDOM_element()
    let half_width_handle = this.handle.getHandle1().offsetWidth/2
    let size_slider = this.options.orientation == 'vertical'?
                      slider.getBoundingClientRect().height : 
                      slider.getBoundingClientRect().width
    let arrOfMarks = this.options.marks

    arrOfMarks.forEach(element => {
      const mark = document.createElement('span')
      mark.textContent = element.label
      mark.classList.add('mark')
      mark.setAttribute('data-value', element.value)
      if (this.options.orientation == 'vertical') {
        this.marks.classList.add('marks_vertical') 
        mark.style.bottom = `${parseValueInPx(element.value,this.options,size_slider)-size_slider-half_width_handle}px`
      } else {
        this.marks.classList.add('marks_horizontal')
        mark.style.left = `${parseValueInPx(element.value,this.options,size_slider)}px`
      }
      this.marks.append(mark)
    });
    this.slider.slider.append(this.marks)
  }

  updateStyle () {
    Array.from(this.marks.children).forEach( el => {
      el.style.marginLeft = `-${el.offsetWidth/2 }px`
    })
  }

  delete () {
    Array.from(this.marks.children).forEach( el => {
      el.remove()
    })
    this.marks.remove()
  }
  getDOM_element() {
    return this.marks
  }
  setOptions(opt) {
    this.options = opt
  }
}