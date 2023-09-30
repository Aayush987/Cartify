const inputEl = document.getElementById("input");
const btn = document.getElementById("add-btn");
const List = document.getElementById("shopping-list");
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"



const appSettings = {
    databaseURL: "https://add-to-cart-3b01e-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database,"list");

btn.addEventListener("click", () => {
       let inputValue = inputEl.value;
       push(shoppingListInDB, inputValue);
       clearItems();

})

function clearItems() {
        inputEl.value = "";
}

function clearShoppingListEl() {
    List.innerHTML = ""
}

function additemtoList(item) {
    let itemID = item[0];
    let itemValue = item[1];
    let newEl = document.createElement("li");

    newEl.textContent = itemValue;
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `list/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    List.append(newEl)

}
onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearShoppingListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
           additemtoList(currentItem)
        }    
    } else {
        List.innerHTML = "No items here... yet"
    }
})