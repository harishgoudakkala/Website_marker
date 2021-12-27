
const saveBtn = document.querySelector("#save_btn")
const inputEl = document.querySelector("#input_box")
const leadsel = document.querySelector("#leads")
const clrBtn = document.querySelector("#clr_btn")
const saveTabBtn = document.querySelector(".save_tab")

let myleads = []

if(localStorage.length) {
    myleads = JSON.parse(localStorage.getItem("leads"))
}
if(myleads){
    renderLeads(myleads)
}

saveTabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true ,currentWindow: true}, function(tabs) {
        myleads.push(tabs[0].url)
        localStorage.setItem("leads", JSON.stringify(myleads))
        renderLeads(myleads)
    })
})

saveBtn.addEventListener("click", function(){
    myleads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("leads", JSON.stringify(myleads))
    console.log(localStorage.getItem("leads"))
    renderLeads(myleads);
})

function renderLeads(leads){
    let listItems =""
    for(let i=0;i<leads.length;i++) {
        listItems +=` 
        <li> 
            <a href='${leads[i]}' target = 'blank' > ${leads[i]} </a> 
        </li> `
    }
    leadsel.innerHTML = listItems
}

clrBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myleads = []
    renderLeads(myleads)
})