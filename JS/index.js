import {
  title,
  main,
  columnToDo,
  columnToDoTitle,
  addToDoBtn,
  columnInProgress,
  columnDone,
  columnDoneTitle,
  deleteAllBtn,
} from "./factory";

import { dialogCreation } from "./creating";

import { dialogEditingCreation } from "./editing";

import { reset, render, renderAll } from "./render";

import { renderUsers, renderUsersInMain } from "./fetch";

import { countInCol } from "./count";

let root = document.querySelector("#root");
let data = [];
export let dataItem = [];
export let id = 0;

window.addEventListener("load", (event) => {
  renderAll();
  countInCol();
});

addToDoBtn.addEventListener("click", (e) => {
  dialogCreation();
  renderUsers(data);
  reset();
});

main.addEventListener("click", function changeCol(e) {
  let localData = localStorage.getItem("data");
  let arr = JSON.parse(localData);
  let target = e.target;
  let itemId = Number(target.parentNode.parentNode.id);
  let currentItem = target.parentNode.parentNode;
  if (target.classList.contains("change")) {
    arr.forEach((element) => {
      if (itemId === element.id && element.label === "todo") {
        element.label = "inProgress";
        currentItem.remove();
      } else if (itemId === element.id && element.label === "inProgress") {
        element.label = "done";
        currentItem.remove();
      } else if (itemId === element.id && element.label === "done") {
        element.label = "todo";
        currentItem.remove();
      }
    });
    toLocal(arr);
    render();
    renderUsersInMain();
    countInCol();
  }
});

main.addEventListener("click", function del(e) {
  let target = e.target;
  if (target.classList.contains("delete")) {
    let localData = localStorage.getItem("data");
    let arr = JSON.parse(localData);
    let currentItem = target.parentNode.parentNode.parentNode;
    let itemId = Number(target.parentNode.parentNode.parentNode.id);
    let filteredArr = arr.filter((element) => {
      return itemId !== element.id;
    });
    currentItem.remove();
    localStorage.clear(data);
    toLocal(filteredArr);
    countInCol();
  }
});

main.addEventListener("click", function dialogEditing(e) {
  let target = e.target;
  if (target.classList.contains("edit")) {
    let itemId = Number(target.parentNode.parentNode.parentNode.id);
    let localData = localStorage.getItem("data");
    let arr = JSON.parse(localData);
    let currentItem = target.parentNode.parentNode.parentNode;
    let tempArr = [];
    let arrForLocal = [];
    let iteratedArr = arr.forEach((el) => {
      if (el.id === itemId) {
        tempArr.push(el);
      } else {
        arrForLocal.push(el);
      }
    });
    dialogEditingCreation();
    let currentTitle = document.getElementById("itemTitle");
    let currentDescription = document.getElementById("itemDescription");
    let currentSelectUser = document.getElementById("selectUser");
    currentTitle.value = tempArr[0].itemTitle;
    currentDescription.value = tempArr[0].itemDescription;
    currentSelectUser.value = tempArr[0].selectUser;
    currentItem.remove();
  }
});

// Local Storage

export function toLocal(obj) {
  localStorage.setItem("data", JSON.stringify(obj));
}

// Append

root.append(title);
root.append(main);

// 1

main.append(columnToDo);
columnToDo.append(columnToDoTitle);
columnToDo.append(addToDoBtn);

// 2

main.append(columnInProgress);

// 3

main.append(columnDone);
columnDone.append(columnDoneTitle);
columnDone.append(deleteAllBtn);
