class Controller {
  constructor (model, view) {
    this.model = model
    this.view = view
    this.view.renderDOM(this.model.getOptions())
    this.view.initStyles()
    this.view.initScripts()
  }
}

export default Controller