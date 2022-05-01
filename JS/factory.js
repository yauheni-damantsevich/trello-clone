export const elCreator = (type, attributes, ...children) => {
  const el = document.createElement(type);
  for (const key in attributes) {
    el.setAttribute(key, attributes[key]);
  }
  children.forEach((child) =>
    typeof child === "string"
      ? el.appendChild(document.createTextNode(child))
      : el.appendChild(child)
  );
  return el;
};

export let title = elCreator(
  "div",
  { class: "flex p-8 justify-between bg-gray-400" },
  elCreator("h1", { class: "text-2xl" }, "Trello"),
  elCreator("div", { id: "clock", class: "text-2xl" }, "12:32")
);

export let main = elCreator("div", {
  class: "flex p-8 justify-evenly gap-8 bg-gray-100",
});

// Columns

// 1

export let columnToDo = elCreator("div", {
  class: "flex flex-col justify-evenly flex-1",
});

export let columnToDoTitle = elCreator(
  "div",
  { class: "flex justify-between bg-green-200 p-4" },
  elCreator("h2", {}, "ToDo"),
  elCreator("span", { id: "count" })
);

export let addToDoBtn = elCreator(
  "button",
  {
    id: "addToDoBtn",
    class: "p-4 bg-green-200",
  },
  "Add ToDo"
);

// 2

export let columnInProgress = elCreator(
  "div",
  { class: "flex flex-col justify-evenly flex-1	" },
  elCreator(
    "div",
    { class: "flex justify-between bg-gray-200 p-4" },
    elCreator("h2", {}, "In Progress"),
    elCreator("span", { id: "count" })
  )
);

// 3

export let columnDone = elCreator("div", {
  class: "flex flex-col justify-evenly flex-1	",
});

export let columnDoneTitle = elCreator(
  "div",
  { class: "flex justify-between bg-blue-200 p-4" },
  elCreator("h2", {}, "Done"),
  elCreator("span", { id: "count" })
);

export let deleteAllBtn = elCreator(
  "button",
  {
    id: "deleteAllBtn",
    class: "p-4 bg-blue-200",
  },
  "delete All"
);
