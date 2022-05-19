import { elCreator } from "./factory";

// Reset Inputs

export function reset() {
  let allInputs = document.querySelectorAll("input");
  allInputs.forEach((e) => {
    e.value = "";
  });
}

// Render

export function render() {
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

// Render All

export function renderAll() {
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
