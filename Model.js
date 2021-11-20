class Model {
  constructor (options) {
    this.options = options || this.initDefoultOptions()
    this._checkCorrectValues(this.options)
    if (this.options.marks) this.checkMarksObject()
  }
  
  getOptions () {
    return this.options
  }
  
  setOption(options) {
    this.options = {...this.options, ...options}
    this._checkCorrectValues(this.options)
    if (this.options.marks) this.checkMarksObject()
  }

  initDefoultOptions() {
    return {
      min_value : 0,
      max_value : 100,
      values : [30,60],
      separator : ' - ',
      modifier : '',
      range : true,  
      orientation : "vertical",
      label : '',
      step : '',  
      marks : [
        {
          value: 0,
          label: `${0}`
        },
        {
          value: 100,
          label: `${100}`
        }]
    };
  }

  _checkCorrectValues (options) {
    let isRange = options.isRange
    let step = options.step
    if (!options.values) options.values = []
    let {min_value, max_value, values: [val1,val2]} = options
    checkStartingValues()

    if (!options.values || !checkOverstatementOrUnderstatement(val1, val2, min_value, max_value)) {
      options.values = [min_value, max_value]
      console.log( new Error ('Укажите корректные значения в опциях'))
    }
    if (step && isNaN(options.step)) options.step = (max_value - min_value)/10
    
    function checkOverstatementOrUnderstatement (val1, val2, min_value, max_value  ) {
      if (val1 === 0 && min_value === 0) val1 = true
      if (val1 && val2) return (val1 >= min_value && val1 <= max_value) && (val2 >= min_value && val2 <= max_value) && (val1 <= val2)
      if (val1 && !isRange) return (val1 >= min_value && val1 <= max_value)
    }
    function checkStartingValues () {
      if (!min_value) {
        options.min_value = 0
        min_value = 0
      }
      if (!max_value){
        options.max_value = 100
        max_value = 100
      } 
      if (!val1 && val2) options.values = [min_value, val2]
      if (!val2 && val1) options.values = [val1, max_value]
    }
  }
  checkMarksObject () {
    this.options.marks = this.options.marks.filter(element => 
      element.value <= this.options.max_value && element.value >= this.options.min_value
    );

  }
}

export default Model