import { creationWindow, editingWindow, main } from "./factory";
import { render } from "./render";
import { renderUsersInMain } from "./fetch";
import { countInCol } from "./count";
import { toLocal, dataItem, id } from "./index";

export function dialogCreation() {
  main.after(creationWindow);
  let creationWindowInHTML = document.getElementById("creationWindow");
  let item = [];
  if (creationWindowInHTML) {
    creationWindowInHTML.addEventListener("change", function ch(e) {
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
          // toLocal(duplicateFix(filterNewItems()));
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

export function currentDataInItem(arr) {
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

// Cancel

export function cancel() {
  let creationWindowInHTML = document.getElementById("creationWindow");
  let editingWindowInHTML = document.getElementById("editingWindow");
  creationWindowInHTML ? creationWindow.remove() : null;
  editingWindowInHTML ? editingWindow.remove() : null;
}
