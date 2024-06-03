"use strict";
import "../style/style.css";

const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const filter = document.getElementById("filter");
const clearAll = document.getElementById("clear");
const formBtn = itemForm.querySelector('button[type="submit"]');
let isEditMode = false;

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.forEach((item) => {
    addItemToDom(item);
  });
  checkUI();
}

function onAddItemSubmit(e) {
  e.preventDefault();
  const newItem = itemInput.value;

  // check the value of itemInput
  if (newItem === "" || newItem.trim().length === 0) {
    alert("Please enter an item!");
    return;
  }

  if (isEditMode) {
    const itemToEdit = itemList.querySelector(".edit-mode");
    itemToEdit.remove();
    formBtn.innerHTML = `<i class="fa-solid fa-plus"></i> Add Item`;
    formBtn.style.backgroundColor = "#333";
    isEditMode = false;
  }

  addItemToDom(newItem);
  addItemsToStorage(newItem);
  checkUI();

  // clear the input value after submit
  itemInput.value = "";
}

function addItemToDom(item) {
  const li = createLi(item);

  itemList.appendChild(li);

  createButtons(li);
}

function createLi(newItem) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = newItem;
  span.id = "cotent";
  const button = `
  <button class="remove-edit-item btn-link text-red">
  <i class="fa-regular fa-pen-to-square" id="edit-item"></i>
  <i class="fa-solid fa-xmark" id="remove-item"></i>
</button>`;
  li.appendChild(span);
  li.insertAdjacentHTML("beforeend", button);
  return li;
}

function createButtons(li) {
  const editIcon = li.querySelector("#edit-item");
  const removeIcon = li.querySelector("#remove-item");

  editIcon.addEventListener("click", editeItem);
  removeIcon.addEventListener("click", removeItem);
}

function editeItem(e) {
  isEditMode = true;
  const content = e.target.parentElement.previousElementSibling.textContent;
  const item = e.target.parentElement.parentElement;

  itemList.querySelectorAll("li").forEach((li) => {
    li.classList.remove("edit-mode");
    removeItemFromStorage(item);
  });

  itemInput.value = content;
  formBtn.style.backgroundColor = "#228b22";
  item.classList.add("edit-mode");
  formBtn.innerHTML = `<i class='fa-solid fa-pen'></i> &nbsp; Update Item`;
}

function addItemsToStorage(item) {
  const itemsFromLocalStrogage = getItemsFromStorage();

  itemsFromLocalStrogage.push(item);

  localStorage.setItem("items", JSON.stringify(itemsFromLocalStrogage));
}

function getItemsFromStorage(item) {
  let itemsFromLocalStrogage;

  if (localStorage.getItem("items") === null) {
    itemsFromLocalStrogage = [];
  } else {
    itemsFromLocalStrogage = JSON.parse(localStorage.getItem("items"));
  }

  return itemsFromLocalStrogage;
}

function removeItem(e) {
  const item = e.target.parentElement.parentElement;
  if (confirm("Do you want to delete this item? ")) {
    // remove from DOM
    item.remove();

    //  remove for storage
    removeItemFromStorage(item);
  }
  checkUI();
}

function removeItemFromStorage(item) {
  const deletedItem = item.childNodes[0].textContent;
  const itemsFromStorage = getItemsFromStorage();
  const updatedItems = itemsFromStorage.filter(
    (stordItem) => stordItem !== deletedItem
  );

  //Re-set Local storage

  localStorage.removeItem("items");
}

function checkUI() {
  const items = itemList.querySelectorAll("li");

  if (items.length === 0) {
    filter.style.display = "none";
    clearAll.style.display = "none";
  } else {
    filter.style.display = "block";
    clearAll.style.display = "block";
  }
}
function fliterItems(e) {
  const items = itemList.querySelectorAll("li");
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstElementChild.textContent.toLowerCase();

    if (itemName.indexOf(text) !== -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}
function clearApp() {
  const items = itemList.querySelectorAll("li");
  items.forEach((item) => item.remove());
  localStorage.setItem("items", JSON.stringify([]));
  checkUI();
}

// Initalize app

function init() {
  window.addEventListener("DOMContentLoaded", displayItems);
  itemForm.addEventListener("submit", onAddItemSubmit);
  filter.addEventListener("input", fliterItems);
  clearAll.addEventListener("click", clearApp);
  checkUI();
}

init();
