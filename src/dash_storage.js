class DashStorage{

  constructor(storageEngine){
    this.storageEngine = storageEngine || localStorage
  }

  set(key, value){
    this.storageEngine.setItem(key, JSON.stringify(value))
  }

  get(key){
    var value = this.storageEngine.getItem(key)
    return JSON.parse(value)
  }
}
export default DashStorage
