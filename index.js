const addItems = document.querySelector(".add-items")
const contents = document.querySelector(".contents")
const clearAll = document.querySelector(".clear-all")
const checkedAll = document.querySelector(".checked-all")
const uncheckedAll = document.querySelector(".unchecked-all")
let items = JSON.parse(localStorage.getItem("items")) || []


function addItem(e) {
    e.preventDefault() //that's going to stop the page from reloading. Because by default, a form is just going to reload the page or send the data to an external source, generally what's your server side.
    const writing = (this.querySelector("[name=text]")).value
    const item = {
        text: writing,
        done: false
    }
    this.reset() //"this" is the form element, and form elements have a method called "reset" on it
    items.push(item)

    fillingtheList()

    localStorage.setItem("items", JSON.stringify(items))

}

function fillingtheList() {
    contents.innerHTML = items.map((item, i) => {
        return `
        <li> 
            <input type="checkbox" data-index=${i} id="item${i}" ${item.done ? "checked" : null} >
            <label for="item${i}">${item.text}</label>
        </li>
        `
    }).join("")
}

function toggleDone(e){
    if(!e.target.matches("input")) return
    const index = e.target.dataset.index
    items[index].done = !items[index].done
    localStorage.setItem("items", JSON.stringify(items))
    fillingtheList()
}

function clearAllItems() {
    items = []
    contents.innerHTML = items 
    localStorage.removeItem("items") 

}

function checkedAllItems() {
    let checkboxes = document.querySelectorAll("input[type=checkbox]")
    items.forEach(item =>{
        item.done = true
        console.log(item.done)
    })
    checkboxes.forEach(checkbox => {
        checkbox.checked = "checked"
    });
    
    localStorage.setItem("items", JSON.stringify(items))
}

function uncheckedAllItems(){
    let checkboxes = document.querySelectorAll("input[type=checkbox]")
    items.forEach(item =>{
        item.done = false
    })
    checkboxes.forEach(checkbox => {
        checkbox.checked = null
    });
    
    localStorage.setItem("items", JSON.stringify(items))

}

addItems.addEventListener("submit", addItem)
contents.addEventListener("click", toggleDone)
clearAll.addEventListener("click", clearAllItems)
checkedAll.addEventListener("click", checkedAllItems)
uncheckedAll.addEventListener("click", uncheckedAllItems)
fillingtheList()
