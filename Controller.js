class Controller {
  constructor (model, view) {
    this.model = model
    this.view = view
    this.view.renderDOM(this.model.getOptions())
  }
}

export default Controller