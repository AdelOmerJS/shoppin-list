"use strict";
import "../style/style.css";

const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const filter = document.getElementById("filter");

itemForm.addEventListener("submit", (e) => {
  /**
   * get the user input value
   * validate the user input
   * create the li item
   *  * put the user vlaue inside the li
   *  * create button for deleteing item
   *  * create button for editing item
   *
   */
  e.preventDefault();
  const newItemValue = itemInput.value;
  if (newItemValue === "" || newItemValue.trim().lenght === 0) {
    alert("Please add an itme first!");
    return;
  }

  const li = crateLi();
  li.appendChild(document.createTextNode(newItemValue));

  const btns = document.createElement("div");
  btns.className = "btns";

  const delteBtn = crateButton();
  const editBtn = crateButton();

  const delteicon = crateIcon("fa-solid fa-xmark");
  const editicon = crateIcon("fa-regular fa-pen-to-square");

  delteBtn.append(delteicon);
  editBtn.append(editicon);

  btns.append(delteBtn);
  btns.append(editBtn);
  li.append(btns);

  itemList.append(li);

  itemInput.value = "";
});

function crateLi() {
  const li = document.createElement("li");
  return li;
}
function crateButton() {
  const button = document.createElement("button");
  button.className = "remove-item btn-link text-red";
  return button;
}
function crateIcon(classes) {
  const i = document.createElement("i");
  i.className = classes;
  return i;
}
