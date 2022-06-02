import { editingWindow, main } from "./factory";
import { cancel, currentDataInItem } from "./creating";
import { render } from "./render";
import { renderUsersInMain } from "./fetch";
import { countInCol } from "./count";
import { toLocal, dataItem, id } from "./index";

export function dialogEditingCreation() {
  main.after(editingWindow);
  let editingWindowInHTML = document.getElementById("editingWindow");
  let item = [];
  if (editingWindowInHTML) {
    editingWindowInHTML.addEventListener("change", function ch(e) {
      let targetId = e.target.id;
      let targetValue = e.target.value;
      let obj = {
        [targetId]: targetValue,
      };
      item.push(obj);
    });
    editingWindowInHTML.addEventListener("click", function cl(e) {
      let target = e.target;
      if (target.id === "cancel") {
        console.log("cancel");
        cancel();
        render();
        renderUsersInMain();
        countInCol();
      } else if (target.id === "confirm") {
        console.log("Hi");
        let localData = localStorage.getItem("data");
        let arr = JSON.parse(localData);
        let currentData = currentDataInItem(item);
        if (currentData.length === 0 && arr && arr.length > 0) {
          console.log("No data");
        } else if (currentData.length > 0 && arr && arr.length > 0) {
          let objCurrentData = Object.assign(...currentData);
          objCurrentData.date = new Date().toLocaleTimeString();
          objCurrentData.id = ++id;
          objCurrentData.label = "todo";
          dataItem.push(objCurrentData);
          toLocal(dataItem);
          toLocal(duplicateFix(filterNewItems()));
          console.log("Changes");
        }
        render();
        cancel();
        renderUsersInMain();
        countInCol();
        editingWindowInHTML.removeEventListener("click", cl);
      }
    });
  }
}

function duplicateFix(fixedData) {
  fixedData.length > 1 ? fixedData.splice(-2, 1) : null;
  console.log(fixedData);
  return fixedData;
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
