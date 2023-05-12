const itemForm = document.getElementById('add-form');
const nameInput = document.getElementById('name');
const imgInput = document.getElementById('imageUrl');
const descInput = document.getElementById('description');
const amtInput = document.getElementById('amount');
const itemList = document.getElementById('item-list');
const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');

// Add an item to the list
function addItem(item) {
    const itemCard = document.createElement('div');
    itemCard.className = 'item-card';
    itemCard.innerHTML = `
        <h3>${item.name}</h3>
        <img src="${item.imageUrl}" alt="${item.name}">
         <p>${item.description}</p>
        <p>${item.amount}</p>
        <button class="delete-btn">Delete</button>
    `;
    itemList.appendChild(itemCard);
    const deleteBtn = itemCard.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        deleteItem(item.id);
    });
}

// Display all items in the list
function displayItems(items) {
itemList.innerHTML = '';
items.forEach(item => {
const itemCard = document.createElement('div');
itemCard.className = 'item-card';
itemCard.innerHTML = `<h3>${item.name}</h3>   <img src="${item.imageUrl}" alt="${item.name}"> <p>${item.description}</p>
        <p>Rs.${item.amount}</p> <button class="delete-btn">Delete</button>` ;
itemList.appendChild(itemCard);
const deleteBtn = itemCard.querySelector('.delete-btn');
deleteBtn.addEventListener('click', () => {
deleteItem(item.id);
});
});
}

// Fetch all items from the server and display them
function fetchItems() {
fetch('/items')
.then(response => response.json())
.then(items => displayItems(items))
.catch(error => console.error('Error fetching items:', error));
}

// Add a new item to the server and display it
function addItemToServer(item) {
fetch('/items', {
method: 'POST',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify(item)
})
.then(response => response.json())
.then(savedItem => {
addItem(savedItem);
itemForm.reset();
})
.catch(error => console.error('Error adding item:', error));
}

// Add an event listener to the add item form
itemForm.addEventListener('submit', event => {
event.preventDefault();
const name = nameInput.value.trim();
const imageUrl = imgInput.value.trim(); 
const description = descInput.value.trim();
const amount = amtInput.value.trim(); 
if (name  && imageUrl && description && amount) {
const newItem = { name, imageUrl, description, amount };
addItemToServer(newItem);
}
});

// Search for items by name
searchBtn.addEventListener('click', () => {
const searchTerm = searchInput.value.trim();
if (searchTerm) {
fetch(`/items/search?name=${searchTerm}`)
.then(response => response.json())
.then(items => displayItems(items))
.catch(error => console.error('Error searching for items:', error));
} else {
fetchItems();
}
});

// Delete an item from the server and remove it from the list
function deleteItem(id) {
fetch(`/items/${id}`, { method: 'DELETE' })
.then(() => {
const itemCard = itemList.querySelector(`[data-id="${id}"]`);
if (itemCard) {
itemCard.remove();
}
})
.catch(error => console.error('Error deleting item:', error));
}

// Fetch all items when the page loads
fetchItems();





