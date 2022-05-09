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
let main = document.getElementById("root")[0];
let data = [];
let url = "https://jsonplaceholder.typicode.com/users";
let dataItem = [];
let id = 0;
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
        let currentData = currentDataInItem(item);
        let objCurrentData = Object.assign(...currentData);
        let label = "todo";
        objCurrentData.label = label;
        objCurrentData.date = new Date().toLocaleTimeString();
        objCurrentData.id = ++id;
        dataItem.push(objCurrentData);
        toLocal(dataItem);
        render();
        cancel();
        creationWindowInHTML.removeEventListener("click", cl);
      }
    });
  }
}

function currentDataInItem(arr) {
  let arrForTitle = [...arr];
  let arrForDescripion = [...arr];
  let arrForSelect = [...arr];
  let currentDataTitle = arrForTitle.filter((el) => el.itemTitle);
  let currentDataDescription = arrForDescripion.filter(
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
        { id: element.id, class: "p-2" },
        elCreator(
          "div",
          { class: "flex justify-between mb-2" },
          elCreator("h3", { class: "text-lg" }, element.itemTitle),
          elCreator(
            "div",
            { class: "flex gap-2" },
            elCreator("button", { id: "edit", class: "border p-1" }, "Edit"),
            elCreator("button", { id: "delete", class: "border p-1" }, "Delete")
          )
        ),
        elCreator(
          "div",
          { class: "flex justify-between mb-2" },
          elCreator("p", {}, element.itemDescription),
          elCreator("button", { id: "change", class: "border p-1" }, ">")
        ),
        elCreator(
          "div",
          { class: "flex" },
          elCreator("span", {}, element.selectUser),
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

main.addEventListener("click", (e) => {
  let localData = localStorage.getItem("data");
  let arr = JSON.parse(localData);
  let target = e.target;
  let itemId = target.parentNode.parentNode.id;
  let currentItem = target.parentNode.parentNode;
  if (target.id === "change") {
    arr.forEach((element, index) => {
      console.log(itemId);
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
