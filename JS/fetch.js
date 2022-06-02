import { elCreator } from "./factory";

let url = "https://jsonplaceholder.typicode.com/users";
let userData;

fetch(url)
  .then((Response) => Response.json())
  .then((data) => {
    userData = data;
    let creationWindowInHTML = document.getElementById("creationWindow");
    let editingWindowInHTML = document.getElementById("editingWindow");
    creationWindowInHTML ? renderUsers(userData) : null;
    editingWindowInHTML ? renderUsers(userData) : null;
  });

// Render Users

export function renderUsers(json) {
  let selection = document.getElementById("selectUser");
  let options = selection.childNodes;
  if (options.length < 2) {
    userData.forEach((el) => {
      let selectUserFromAPI = elCreator("option", { value: el.id }, el.name);
      selection.append(selectUserFromAPI);
    });
  }
}

// Render Users in Main

export function renderUsersInMain() {
  let users = document.querySelector(".users");
  if (users) {
    userData.forEach((e) => {
      if (Number(users.innerText) === e.id) {
        users.innerText = e.name;
      }
    });
  }
}
