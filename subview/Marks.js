export default class Marks {
  constructor (options,slider) {
    this.options = options
    this.slider = slider
  }

  renderMarks () {
    const marksContainer = document.createElement ('div')
    marksContainer.classList.add('marks')
    // if (this.options.marks) renderMark()
    this.slider.append(marksContainer)
  }
}