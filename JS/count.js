export function countInCol() {
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
