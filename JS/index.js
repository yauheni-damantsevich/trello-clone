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
  let options = document.getElementsByTagName("option");
  if (options.length < 2) {
    userData.forEach((el) => {
      let selectUserFromAPI = elCreator("option", { value: el.id }, el.name);
      selection.append(selectUserFromAPI);
    });
  }
}

// Creation

addToDoBtn.addEventListener("click", (e) => {
  dialogCreation();
  renderUsers(data);
  reset();
});

function dialogCreation() {
  root.prepend(creationWindow);
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
      item.unshift(obj);
    });
    creationWindowInHTML.addEventListener("click", function cl(e) {
      let target = e.target;
      if (target.id === "cancel") {
        cancel();
      } else if (target.id === "confirm") {
        let localData = localStorage.getItem("data");
        let arr = JSON.parse(localData);
        let currentData = currentDataInItem(item);
        let label = "todo";
        if (currentData.length > 0 && arr.length > 0) {
          let objCurrentData = Object.assign(...currentData);
          objCurrentData.label = label;
          objCurrentData.date = new Date().toLocaleTimeString();
          objCurrentData.id = ++id;
          dataItem.push(objCurrentData);
          // toLocal(dataItem);
          deleteOldItem();
          filterNewItems();
          render();
          cancel();
          renderUsersInMain();
          creationWindowInHTML.removeEventListener("click", cl);
        } else if (currentData.length === 0 && arr.length > 0) {
          deleteOldItem();
          filterNewItems();
          render();
          cancel();
          renderUsersInMain();
          creationWindowInHTML.removeEventListener("click", cl);
        } else {
          toLocal(dataItem);
          filterNewItems();
          render();
          cancel();
          renderUsersInMain();
          creationWindowInHTML.removeEventListener("click", cl);
        }
      }
    });
  }
}

function deleteOldItem() {
  let localData = localStorage.getItem("data");
  let arr = JSON.parse(localData);
  arr.pop();
}

function filterNewItems() {
  let localData = localStorage.getItem("data");
  let arr = JSON.parse(localData);
  arr.forEach((e) => {
    if (e.itemTitle === undefined) {
      e.itemTitle = arr[arr.length - 2].itemTitle;
    } else if (e.itemDescription === undefined) {
      e.itemDescription = arr[arr.length - 2].itemDescription;
    } else if (e.selectUser === undefined) {
      e.selectUser = arr[arr.length - 2].selectUser;
    }
  });
  arr.splice(-2, -1);
  toLocal(arr);
}

function currentDataInItem(arr) {
  let arrForTitle = [...arr];
  let arrForDescription = [...arr];
  let arrForSelect = [...arr];
  let currentDataTitle = arrForTitle.filter((el) => el.itemTitle);
  let currentDataDescription = arrForDescription.filter(
    (el) => el.itemDescription
  );
  let currentDataSelect = arrForSelect.filter((el) => el.selectUser);
  let cropCurrentDataTitle = currentDataTitle.slice(0, 1);
  let cropCurrentDataDescription = currentDataDescription.slice(0, 1);
  let cropCurrentDataSelect = currentDataSelect.slice(0, 1);
  let currentData = cropCurrentDataTitle.concat(
    cropCurrentDataDescription,
    cropCurrentDataSelect
  );

  return currentData;
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
        { id: element.id, class: "p-2 mb-2" },
        elCreator(
          "div",
          { class: "flex justify-between mb-2" },
          elCreator("h3", { class: "text-lg" }, element.itemTitle),
          elCreator(
            "div",
            { class: "flex gap-2" },
            elCreator("button", { class: "edit border p-1" }, "Edit"),
            elCreator("button", { class: "delete border p-1" }, "Delete")
          )
        ),
        elCreator(
          "div",
          { class: "flex justify-between mb-2" },
          elCreator("p", {}, element.itemDescription),
          elCreator("button", { class: "change border p-1" }, ">")
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
  }
});

// Render Users

function renderUsersInMain() {
  let users = document.querySelector(".users");
  userData.forEach((e) => {
    if (Number(users.innerText) === e.id) {
      users.innerText = e.name;
    }
  });
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
  }
});

//Dialog Editing

main.addEventListener("click", function dialogEditing(e) {
  let target = e.target;
  if (target.classList.contains("edit")) {
    let itemId = Number(target.parentNode.parentNode.parentNode.id);
    console.log(itemId);
    let localData = localStorage.getItem("data");
    let arr = JSON.parse(localData);
    let currentItem = target.parentNode.parentNode.parentNode;
    let tempArr = [];
    let iteratedArr = arr.forEach((el, i) => {
      if (el.id === itemId) {
        tempArr.push(el);
        console.log("YESS");
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
