import {
  elCreator,
  title,
  main,
  columnToDo,
  columnToDoTitle,
  addToDoBtn,
  columnInProgress,
  columnDone,
  columnDoneTitle,
  deleteAllBtn,
  creationWindow,
  warning,
} from "./factory";
import log from "tailwindcss/lib/util/log";

let root = document.querySelector("#root");
let data = [];
let url = "https://jsonplaceholder.typicode.com/users";
let dataItem = [];
let id = 0;
let userData;
fetch(url)
  .then((Response) => Response.json())
  .then((data) => {
    userData = data;
    let creationWindowInHTML = document.getElementById("creationWindow");
    creationWindowInHTML ? renderUsers(userData) : null;
  });

// Users

function renderUsers(json) {
  let selection = document.getElementById("selectUser");
  let options = selection.childNodes;
  if (options.length < 2) {
    userData.forEach((el) => {
      let selectUserFromAPI = elCreator("option", { value: el.id }, el.name);
      selection.append(selectUserFromAPI);
    });
  }
}

// Window

window.addEventListener("load", (event) => {
  renderAll();
  countInCol();
});

// Creation

addToDoBtn.addEventListener("click", (e) => {
  dialogCreation();
  renderUsers(data);
  reset();
});

function dialogCreation() {
  main.after(creationWindow);
  let creationWindowInHTML = document.getElementById("creationWindow");
  let item = [];
  if (creationWindowInHTML) {
    creationWindowInHTML.addEventListener("change", function ch(e) {
      let target = e.target;
      let targetId = e.target.id;
      let targetValue = e.target.value;
      let obj = {
        [targetId]: targetValue,
      };
      item.push(obj);
    });
    creationWindowInHTML.addEventListener("click", function cl(e) {
      let target = e.target;
      if (target.id === "cancel") {
        console.log("cancel");
        cancel();
        render();
        renderUsersInMain();
        countInCol();
      } else if (target.id === "confirm") {
        let localData = localStorage.getItem("data");
        let arr = JSON.parse(localData);
        let currentData = currentDataInItem(item);
        if (currentData.length > 0 && arr && arr.length === 0) {
          let objCurrentData = Object.assign(...currentData);
          objCurrentData.date = new Date().toLocaleTimeString();
          objCurrentData.id = ++id;
          dataItem.push(objCurrentData);
          toLocal(dataItem);
        } else if (currentData.length === 0 && arr && arr.length > 0) {
          console.log("No data");
        } else if (currentData.length > 0 && arr && arr.length > 0) {
          let objCurrentData = Object.assign(...currentData);
          objCurrentData.date = new Date().toLocaleTimeString();
          objCurrentData.id = ++id;
          objCurrentData.label = "todo";
          dataItem.push(objCurrentData);
          toLocal(dataItem);
          toLocal(filterNewItems());
          toLocal(duplicateFix());
          console.log("Changes");
        } else {
          console.log("First");
          let objCurrentData = Object.assign(...currentData);
          objCurrentData.date = new Date().toLocaleTimeString();
          objCurrentData.id = ++id;
          dataItem.push(objCurrentData);
          toLocal(dataItem);
        }
        render();
        cancel();
        renderUsersInMain();
        countInCol();
        creationWindowInHTML.removeEventListener("click", cl);
      }
    });
  }
}

function duplicateFix() {
  let localData = localStorage.getItem("data");
  let arr = JSON.parse(localData);
  let newArr = arr.splice(-2, 1);
  console.log(newArr);
  return newArr;
}

function filterNewItems() {
  let localData = localStorage.getItem("data");
  let arr = JSON.parse(localData);
  console.log(arr);
  let inputLabel = document.getElementById("label").value;
  if (arr) {
    arr.forEach((e) => {
      if (e.itemTitle === undefined) {
        e.itemTitle = arr[arr.length - 2].itemTitle;
      }
      if (e.itemDescription === undefined) {
        e.itemDescription = arr[arr.length - 2].itemDescription;
      }
      if (e.selectUser === undefined) {
        e.selectUser = arr[arr.length - 2].selectUser;
      }
      if (e.label !== undefined) {
        e.label = inputLabel;
      }
    });
  }
  return arr;
}

function currentDataInItem(arr) {
  let arrForDescription = [...arr];
  let arrForTitle = [...arr];
  let arrForSelect = [...arr];
  let arrForLabel = [...arr];
  let currentDataTitle = arrForTitle.filter((el) => el.itemTitle);
  let currentDataDescription = arrForDescription.filter(
    (el) => el.itemDescription
  );
  let currentDataSelect = arrForSelect.filter((el) => el.selectUser);
  let currentDataLabel = arrForLabel.filter((el) => el.label);
  let cropCurrentDataTitle = currentDataTitle.slice(
    -1,
    currentDataTitle.length
  );
  let cropCurrentDataDescription = currentDataDescription.slice(
    -1,
    currentDataDescription.length
  );
  let cropCurrentDataSelect = currentDataSelect.slice(
    -1,
    currentDataSelect.length
  );
  let cropCurrentDataLabel = currentDataLabel.slice(
    -1,
    currentDataLabel.length
  );
  let result = [
    ...cropCurrentDataTitle,
    ...cropCurrentDataDescription,
    ...cropCurrentDataSelect,
    ...cropCurrentDataLabel,
  ];
  return result;
}

// Local Storage

function reset() {
  let allInputs = document.querySelectorAll("input");
  allInputs.forEach((e) => {
    e.value = "";
  });
}

function toLocal(obj) {
  localStorage.setItem("data", JSON.stringify(obj));
}

// Render

function render() {
  let localData = localStorage.getItem("data");
  let arr = JSON.parse(localData);
  let columnToDo = document.getElementById("columnToDo");
  let columnInProgress = document.getElementById("columnInProgress");
  let columnDone = document.getElementById("columnDone");
  arr.forEach((element) => {
    if (arr.indexOf(element) === arr.length - 1) {
      let item = elCreator(
        "div",
        { id: element.id, class: "p-2 mb-2 rounded-lg " },
        elCreator(
          "div",
          { class: "flex justify-between mb-2" },
          elCreator("h3", { class: "text-lg" }, element.itemTitle),
          elCreator(
            "div",
            { class: "flex gap-2" },
            elCreator(
              "button",
              { class: "edit border p-1 rounded-lg" },
              "Edit"
            ),
            elCreator(
              "button",
              { class: "delete border p-1 rounded-lg" },
              "Delete"
            )
          )
        ),
        elCreator(
          "div",
          { class: "flex justify-between mb-2" },
          elCreator("p", {}, element.itemDescription),
          elCreator("button", { class: "change border p-1 rounded-lg" }, ">")
        ),
        elCreator(
          "div",
          { class: "flex justify-between" },
          elCreator("span", { class: "users" }, element.selectUser),
          elCreator("p", {}, element.date)
        )
      );
      if (element.label === "todo") {
        item.classList.add("bg-green-100");
        columnToDo.after(item);
      } else if (element.label === "inProgress") {
        item.classList.add("bg-gray-100");
        columnInProgress.after(item);
      } else if (element.label === "done") {
        item.classList.add("bg-blue-100");
        columnDone.after(item);
      }
    }
  });
}

function renderAll() {
  let localData = localStorage.getItem("data");
  let arr = JSON.parse(localData);
  let columnToDo = document.getElementById("columnToDo");
  let columnInProgress = document.getElementById("columnInProgress");
  let columnDone = document.getElementById("columnDone");
  arr.forEach((element) => {
    let item = elCreator(
      "div",
      { id: element.id, class: "p-2 mb-2 rounded-lg " },
      elCreator(
        "div",
        { class: "flex justify-between mb-2" },
        elCreator("h3", { class: "text-lg" }, element.itemTitle),
        elCreator(
          "div",
          { class: "flex gap-2" },
          elCreator("button", { class: "edit border p-1 rounded-lg" }, "Edit"),
          elCreator(
            "button",
            { class: "delete border p-1 rounded-lg" },
            "Delete"
          )
        )
      ),
      elCreator(
        "div",
        { class: "flex justify-between mb-2" },
        elCreator("p", {}, element.itemDescription),
        elCreator("button", { class: "change border p-1 rounded-lg" }, ">")
      ),
      elCreator(
        "div",
        { class: "flex justify-between" },
        elCreator("span", { class: "users" }, element.selectUser),
        elCreator("p", {}, element.date)
      )
    );
    if (element.label === "todo") {
      item.classList.add("bg-green-100");
      columnToDo.after(item);
    } else if (element.label === "inProgress") {
      item.classList.add("bg-gray-100");
      columnInProgress.after(item);
    } else if (element.label === "done") {
      item.classList.add("bg-blue-100");
      columnDone.after(item);
    }
  });
}

// Count

function countInCol() {
  let localData = localStorage.getItem("data");
  let arr = JSON.parse(localData);
  let objCount = { todoCount: 0, inProgressCount: 0, doneCount: 0 };
  let todoSpan = document.getElementById("todoCount");
  let inProgressSpan = document.getElementById("inProgressCount");
  let doneSpan = document.getElementById("doneCount");
  let todoCount = 0;
  let inProgressCount = 0;
  let doneCount = 0;
  let filteredAllItems = arr.filter((el) => {
    if (el.id > 0) {
      if (el.label === "todo") {
        todoCount++;
      } else if (el.label === "inProgress") {
        inProgressCount++;
      } else if (el.label === "done") {
        doneCount++;
      }
    }
  });
  todoSpan.innerText = todoCount;
  inProgressSpan.innerText = inProgressCount;
  doneSpan.innerText = doneCount;
}

// Change Column

main.addEventListener("click", function changeCol(e) {
  let localData = localStorage.getItem("data");
  let arr = JSON.parse(localData);
  let target = e.target;
  let itemId = target.parentNode.parentNode.id;
  let currentItem = target.parentNode.parentNode;
  if (target.classList.contains("change")) {
    arr.forEach((element) => {
      if (itemId == element.id && element.label === "todo") {
        element.label = "inProgress";
        currentItem.remove();
      } else if (itemId == element.id && element.label === "inProgress") {
        element.label = "done";
        currentItem.remove();
      } else if (itemId == element.id && element.label === "done") {
        element.label = "todo";
        currentItem.remove();
      } else null;
    });
    toLocal(arr);
    render();
    renderUsersInMain();
    countInCol();
  }
});

// Render Users

function renderUsersInMain() {
  let users = document.querySelector(".users");
  if (users) {
    userData.forEach((e) => {
      if (Number(users.innerText) === e.id) {
        users.innerText = e.name;
      }
    });
  }
}

// Delete

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

//Dialog Editing

main.addEventListener("click", function dialogEditing(e) {
  let target = e.target;
  if (target.classList.contains("edit")) {
    let itemId = Number(target.parentNode.parentNode.parentNode.id);
    let localData = localStorage.getItem("data");
    let arr = JSON.parse(localData);
    let currentItem = target.parentNode.parentNode.parentNode;
    let tempArr = [];
    let arrForLocal = [];

    //вот здесь ошибка заменяю список одним изменяемым айтемом ток а надо пушить изменямый айтем в конец

    let iteratedArr = arr.forEach((el, i) => {
      if (el.id === itemId) {
        tempArr.push(el);
      } else {
        arrForLocal.push(el);
      }
    });
    let creationWindowInHTML = document.getElementById("creationWindow");
    dialogCreation();
    let form = document.getElementsByTagName("form");
    let currentTitle = document.getElementById("itemTitle");
    let currentDescription = document.getElementById("itemDescription");
    let currentSelectUser = document.getElementById("selectUser");
    currentTitle.value = tempArr[0].itemTitle;
    currentDescription.value = tempArr[0].itemDescription;
    currentSelectUser.value = tempArr[0].selectUser;
    currentItem.remove();
  }
});

// Cancel

function cancel() {
  let creationWindowInHTML = document.getElementById("creationWindow");
  creationWindowInHTML ? creationWindow.remove() : null;
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
