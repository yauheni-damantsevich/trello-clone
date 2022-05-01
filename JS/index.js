import {
  objCreator,
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
} from "./factory";

let root = document.querySelector("#root");

root.append(title);
root.append(main);

main.append(columnToDo);
columnToDo.append(columnToDoTitle);
columnToDo.append(addToDoBtn);

main.append(columnInProgress);

main.append(columnDone);
columnDone.append(columnDoneTitle);
columnDone.append(deleteAllBtn);
