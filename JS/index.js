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
let cancelBtn = document.querySelector("#cancel");
let confirmBtn = document.querySelector("confirm");
let data = [];
let url = "https://jsonplaceholder.typicode.com/users";
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

  userData.forEach((el) => {
    let selectUserFromAPI = elCreator("option", { value: el.id }, el.name);
    selection.append(selectUserFromAPI);
  });
}

// Creation

addToDoBtn.addEventListener("click", (e) => {
  dialogCreation();
  renderUsers(data);
});

function dialogCreation() {
  root.prepend(creationWindow);
  let creationWindowInHTML = document.getElementById("creationWindow");
  let item = [];
  if (creationWindowInHTML) {
    creationWindowInHTML.addEventListener("change", (e) => {
      let target = e.target;
      let targetId = e.target.id;
      let targetValue = e.target.value;
      let obj = {
        [targetId]: targetValue,
      };
      item.unshift(obj);
    });
    creationWindowInHTML.addEventListener("click", (e) => {
      let target = e.target;
      if (target.id === "cancel") {
        cancel();
      } else if (target.id === "confirm") {
        let currentData = currentDataInItem(item);
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

// Cancel

function cancel() {
  let creationWindowInHTML = document.getElementById("creationWindow");
  creationWindowInHTML ? creationWindowInHTML.remove() : null;
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
