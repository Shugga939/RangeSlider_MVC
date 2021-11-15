class Controller {
  constructor (model, view) {
    this.model = model
    this.view = view
    this.view.renderDOM(this.model.getOptions())
    this.view.initValues()
    this.view.initStyles()
    this.view.initScripts()
  }

  setOptions (opt) {
    this.model.setOption(opt)
    this.view.update(this.model.getOptions())
  }
}

export default Controller