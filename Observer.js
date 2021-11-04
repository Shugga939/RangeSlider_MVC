class Observer {
  constructor(){
    this.observers = []
  }
  subscribe (fn) {
    this.observers.push(fn)
  }
  broadcast (value1,value2) {
    this.observers.forEach(func =>{
      switch (func.name){
      case 'updateValue' : {func(value1,value2)}
      }
    })
  }
}

export default Observer
