const userCategoryList = ["School", "Work", "Side Hustle"];

const todoList = [
	{
		category: "Inbox",
		title: "Walk the dog",
		notes: null,
		dueDate: null,
		priority: null,
		id: 1,
		isCompleted: true,
	},
	{
		category: "Inbox",
		title: "Grocery shopping",
		notes: "Water, eggs, milk",
		dueDate: null,
		priority: "med",
		id: 2,
		isCompleted: false,
	},
	{
		category: "Someday",
		title: "Finish cabinets",
		notes: null,
		dueDate: "12/31/24",
		priority: null,
		id: 3,
		isCompleted: false,
	},
];

const userCategories = document.querySelector(".user-categories");
const list = document.querySelector(".todo-list");
const defaultCategories = document.querySelector(
	".default-categories"
).children;

let currentDisplay = "Inbox";

for (let i = 0; i < defaultCategories.length; i++) {
	defaultCategories[i].addEventListener("click", () => {
		for (const element of document.getElementsByClassName(
			"active-category"
		)) {
			element.classList.remove("active-category");
		}
		changeDisplay(defaultCategories[i].lastElementChild.textContent);
		defaultCategories[i].classList.add("active-category");
	});
}

function Todo(category, title, notes, dueDate, priority, id, isCompleted) {
	return { category, title, notes, dueDate, priority, id, isCompleted };
}

function createTodo(category, title, notes, dueDate, priority) {
	const id = Date.now();
	const newTodo = Todo(category, title, notes, dueDate, priority, id, false);
	todoList.push(newTodo);
	reloadDisplay();
}

function createCategory(name) {
	if (isExistingCategory(name)) {
		console.error(`Category: '${name}' already exists`);
		return;
	}
	userCategoryList.push(name);
	console.log("category added");
	reloadDisplay(currentDisplay);
}

function addUserCategoryEventListeners() {
	const userCategoryListItems =
		document.querySelector(".user-categories").children;

	for (let i = 0; i < userCategoryListItems.length; i++) {
		userCategoryListItems[i].addEventListener("click", () => {
			for (const element of document.getElementsByClassName(
				"active-category"
			)) {
				element.classList.remove("active-category");
			}
			changeDisplay(
				userCategoryListItems[i].firstElementChild.textContent
			);

			userCategoryListItems[i].classList.add("active-category");
			userCategoryListItems[i].classList.add("test");
			console.log(userCategoryListItems[i].classList);
		});
	}
}

function displayUserCategories() {
	userCategoryList.forEach((userCategory) => {
		const li = document.createElement("li");
		const p = document.createElement("p");

		p.textContent = userCategory;

		li.appendChild(p);
		userCategories.appendChild(li);
	});
}

function displayTodoList(category) {
	const categorizedList = todoList.filter(
		(todo) => todo.category == category
	);

	console.log(categorizedList);

	categorizedList.forEach((todo) => {
		const li = document.createElement("li");
		const input = document.createElement("input");
		const p = document.createElement("p");

		li.setAttribute("id", todo.id);
		input.setAttribute("type", "checkbox");

		li.classList.add("todo-item");
		input.classList.add("checkbox");

		p.textContent = todo.title;

		if (todo.isCompleted) input.checked = true;

		input.addEventListener("click", () => {
			todo.isCompleted = !todo.isCompleted;
		});

		li.appendChild(input);
		li.appendChild(p);

		list.appendChild(li);
	});

	const categoryHeader = document.querySelector(".category-header");
	categoryHeader.textContent = category;
}

function isExistingCategory(name) {
	for (const category of userCategoryList) {
		if (category == name) {
			return true;
		}
	}
}

function reloadDisplay(currentDisplay) {
	while (list.firstChild) {
		list.removeChild(list.firstChild);
	}
	while (userCategories.firstChild) {
		userCategories.removeChild(userCategories.firstChild);
	}
	displayTodoList(currentDisplay);
	displayUserCategories();
	addUserCategoryEventListeners();
}

function changeDisplay(newDisplay) {
	console.log(`Change display to: ${newDisplay}`);
	currentDisplay = newDisplay;
	reloadDisplay(currentDisplay);
}

reloadDisplay("Inbox");
