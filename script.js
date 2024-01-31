const formInput = document.querySelector(".form-input");
const addBtn = document.querySelector(".btn");
const removeBtn = document.querySelectorAll(".remove-item");
const clearBtn = document.querySelector("#clear");
const itemList = document.querySelector("#item-list");
const filter = document.querySelector("#filter");

const removeHandler = (event) => {
  if (event.target.parentElement.classList.contains("remove-item")) {
    event.target.parentElement.parentElement.remove();
  }
  savetoLocalStorage();
};
const clearHandler = () => {
  const listItems = document.querySelectorAll("ul#item-list li");
  //   listItems.forEach((item) => item.remove());
  filter.value = "";
  listItems.forEach((li) => {
    li.style.display = "flex";
  });
};
const addHandler = (event) => {
  event.preventDefault();

  if (!formInput.value) return;

  const li = document.createElement("li");
  li.appendChild(document.createTextNode(formInput.value));

  const button = createBtn("remove-item btn-link text-red");

  li.appendChild(button);
  li.classList.add("item");
  li.addEventListener("click", removeHandler);

  itemList.appendChild(li);
  savetoLocalStorage();
  formInput.value = "";
  formInput.focus();
};
const filterHandler = (e) => {
  const listItems = document.querySelectorAll("ul#item-list li");
  const filteredItems = Array.from(listItems).filter((li) =>
    li.textContent.toLowerCase().includes(e.target.value.toLowerCase())
  );
  listItems.forEach((li) => {
    if (filteredItems.includes(li)) {
      li.style.display = "flex";
    } else {
      li.style.display = "none";
    }
  });
};
function renderHandler(itemName) {
  const li = document.createElement("li");
  li.textContent = itemName;

  const button = createBtn("remove-item btn-link text-red");

  li.appendChild(button);
  li.classList.add("item");
  li.addEventListener("click", removeHandler);
  itemList.appendChild(li);
}
function savetoLocalStorage() {
  const listItems = Array.from(document.querySelectorAll("#item-list li"));
  const itemNames = listItems.map((item) => item.textContent.trim());
  localStorage.setItem("shoppingList", JSON.stringify(itemNames));
}
function loadListFromLocalStorage() {
  const storedItems = localStorage.getItem("shoppingList");
  if (storedItems) {
    const itemNames = JSON.parse(storedItems);
    itemNames.forEach((itemName) => renderHandler(itemName));
  }
}
function createBtn(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}
function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}
function init() {
  // Event Listeners
  window.addEventListener("load", loadListFromLocalStorage);
  addBtn.addEventListener("click", addHandler);
  removeBtn.forEach((btn) => btn.addEventListener("click", removeHandler));
  clearBtn.addEventListener("click", clearHandler);
  filter.addEventListener("input", filterHandler);
}

init();
