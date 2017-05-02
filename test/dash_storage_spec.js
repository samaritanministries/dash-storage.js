import DashStorage from "src/dash_storage"

describe("LocalStorage", ()=>{

  beforeEach(()=>{
    localStorage.clear()
    sessionStorage.clear()
  })

  it("uses localStorage by default", ()=>{
    var dashStorage = new DashStorage()
    var myString = "test123"

    dashStorage.set("foo", myString)

    expect(dashStorage.get("foo")).toEqual(JSON.parse(localStorage.getItem("foo")))
    expect(dashStorage.get("foo")).not.toEqual(JSON.parse(sessionStorage.getItem("foo")))
  })

  it("can alternatively use sessionStorage", ()=>{
    var dashStorage = new DashStorage(sessionStorage)
    var myString = "test123"

    dashStorage.set("foo", myString)

    expect(dashStorage.get("foo")).toEqual(JSON.parse(sessionStorage.getItem("foo")))
    expect(dashStorage.get("foo")).not.toEqual(JSON.parse(localStorage.getItem("foo")))
  })

  it("can store a string", ()=>{
    var dashStorage = new DashStorage(sessionStorage)
    var myString = "test123"

    dashStorage.set("foo", myString)

    expect(dashStorage.get("foo")).toEqual(myString)
  })

  it("can store an object", ()=>{
    var dashStorage = new DashStorage(sessionStorage)
    var myObject = {test: "bar"}

    dashStorage.set("foo", myObject)

    expect(dashStorage.get("foo")).toEqual(myObject)
  })

  it("can store an array", ()=>{
    var dashStorage = new DashStorage(sessionStorage)
    var myArray = ["bar1", "bar2", "bar3"]

    dashStorage.set("foo", myArray)

    expect(dashStorage.get("foo")).toEqual(myArray)
  })

  it("can store an object with an array", ()=>{
    var dashStorage = new DashStorage(sessionStorage)
    var myObjectWithArray = {test: ["bar1", "bar2", "bar3"]}

    dashStorage.set("foo", myObjectWithArray)

    expect(dashStorage.get("foo")).toEqual(myObjectWithArray)
  })

  it("can store an array of objects", ()=>{
    var dashStorage = new DashStorage(sessionStorage)
    var myArrayOfObjects = [
      {foo:"bar"},
      {foo2:"bar"}
    ]

    dashStorage.set("foo", myArrayOfObjects)

    expect(dashStorage.get("foo")).toEqual(myArrayOfObjects)
  })

  it("can remove by key",()=>{
    var dashStorage = new DashStorage()
    dashStorage.set("foo", "bar")

    dashStorage.remove("foo")

    expect(dashStorage.get("foo")).toBe(null)
  })

})
