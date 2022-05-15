export const elCreator = (type, attributes, ...children) => {
  const el = document.createElement(type);
  for (const key in attributes) {
    el.setAttribute(key, attributes[key]);
  }
  children.forEach((child) => {
    if (typeof child === "string") {
      el.appendChild(document.createTextNode(child));
    } else if (child == undefined) null;
    else {
      el.appendChild(child);
    }
  });
  return el;
};

export let title = elCreator(
  "div",
  { class: "flex p-8 justify-between bg-gray-50	" },
  elCreator("h1", { class: "text-2xl" }, "Trello"),
  elCreator("div", { id: "clock", class: "text-2xl" }, "12:32")
);

export let main = elCreator("div", {
  class: "flex p-8 justify-evenly gap-8",
});

// Columns

// 1

export let columnToDo = elCreator("div", {
  class: "flex flex-col justify-evenly flex-1",
});

export let columnToDoTitle = elCreator(
  "div",
  { id: "columnToDo", class: "flex justify-between bg-green-200 p-4" },
  elCreator("h2", { class: "text-xl" }, "ToDo"),
  elCreator("span", { class: "count" })
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
  {
    class: "flex flex-col justify-evenly flex-1	",
  },
  elCreator(
    "div",
    {
      id: "columnInProgress",
      class: "flex justify-between bg-gray-200 p-4",
    },
    elCreator("h2", { class: "text-xl" }, "In Progress"),
    elCreator("span", { class: "count" })
  )
);

// 3

export let columnDone = elCreator("div", {
  class: "flex flex-col justify-evenly flex-1	",
});

export let columnDoneTitle = elCreator(
  "div",
  { id: "columnDone", class: "flex justify-between bg-blue-200 p-4" },
  elCreator("h2", { class: "text-xl" }, "Done"),
  elCreator("span", { class: "count" })
);

export let deleteAllBtn = elCreator(
  "button",
  {
    id: "deleteAllBtn",
    class: "p-4 bg-blue-200",
  },
  "Delete All"
);

// Creation Window

export let creationWindow = elCreator(
  "div",
  {
    id: "creationWindow",
    class: "absolute w-full h-full backdrop-blur-md",
  },
  elCreator(
    "form",
    {
      class:
        "w-2/5 m-auto flex flex-col gap-4 bg-green-200 p-8 drop-shadow-2xl",
    },
    elCreator("input", {
      id: "itemTitle",
      class: "text-lg font-bold p-4",
      placeholder: "Enter the title",
    }),
    elCreator("input", {
      id: "itemDescription",
      class: "text-m font-semibold p-4 pb-16",
      placeholder: "Enter the description",
    }),
    elCreator(
      "div",
      { class: "flex justify-between" },
      elCreator(
        "select",
        { id: "selectUser" },
        elCreator("option", { value: "1" }, "select user")
      ),
      elCreator(
        "div",
        { class: "flex gap-8" },
        elCreator(
          "button",
          { id: "cancel", type: "button", class: "p-2 bg-white" },
          "Cancel"
        ),
        elCreator(
          "button",
          { id: "confirm", type: "button", class: "p-2 bg-white" },
          "Confirm"
        )
      )
    )
  )
);

// Warning

export let warning = elCreator(
  "div",
  {
    class: "absolute w-full h-full backdrop-blur-md",
  },
  elCreator(
    "div",
    { class: "flex gap-8" },
    elCreator(
      "button",
      { id: "cancel", type: "button", class: "p-2 bg-white" },
      "Cancel"
    ),
    elCreator(
      "button",
      { id: "confirm", type: "button", class: "p-2 bg-white" },
      "Confirm"
    )
  )
);
