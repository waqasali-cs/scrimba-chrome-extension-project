let myLeads=[]
const inputEl=document.getElementById("input-el")
const inputBtn=document.getElementById("input-btn")
const ulEl=document.getElementById("ul-el")
const delBtn=document.getElementById("delete-btn")
const delAllBtn=document.getElementById("deleteAll-btn")
const tabBtn = document.getElementById("tab-btn")

let leadsFromLocalStorage=JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage){
    myLeads=leadsFromLocalStorage
    renderLeads()
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

delAllBtn.addEventListener("click", function(){
    localStorage.clear()
    myLeads=[]
    renderLeads()
})

delBtn.addEventListener("click", function(){
    myLeads.pop()
    localStorage.setItem('myLeads',JSON.stringify(myLeads))
    renderLeads()
})

inputBtn.addEventListener("click", function(){
    if(inputEl.value.trim()==""){
        alert("Empty")}
    else{
        myLeads.push(inputEl.value)
        inputEl.value=""
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        renderLeads()}

})

function renderLeads() {
    let listItems = ""
    for (let i = 0; i < myLeads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='http://${myLeads[i]}'>
                    ${myLeads[i]}
                </a>
            </li>`
    }
    ulEl.innerHTML = listItems
}
