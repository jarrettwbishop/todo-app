// const categoryList = [
// 	{
// 		category: "Inbox",
// 		isEditable: false,
// 	},
// 	{
// 		category: "Today",
// 		isEditable: false,
// 	},
// 	{
// 		category: "Someday",
// 		isEditable: false,
// 	},
// ];

const userCategoryList = ["School", "Work", "Side Hustle"];

const todoList = [
	{
		category: "Inbox",
		title: "Walk the dog",
		notes: null,
		dueDate: null,
		priority: null,
		id: 1,
	},
	{
		category: "Inbox",
		title: "Grocery shopping",
		notes: "Water, eggs, milk",
		dueDate: null,
		priority: "med",
		id: 2,
	},
	{
		category: "Someday",
		title: "Finish cabinets",
		notes: null,
		dueDate: "12/31/24",
		priority: null,
		id: 3,
	},
];

const userCategories = document.querySelector(".user-categories");
const list = document.querySelector(".todo-list");
const defaultCategories = document.querySelector(
	".default-categories"
).children;

let currentDisplay = "Inbox";

function Todo(category, title, notes, dueDate, priority) {
	return { category, title, notes, dueDate, priority, id };
}

function createTodo(category, title, notes, dueDate, priority) {
	const id = Date.now();
	const newTodo = Todo(category, title, notes, dueDate, priority, id);
	todoList.push(newTodo);
}

// function Category(name) {
// 	return {
// 		name: name,
// 		isEditable: true,
// 	};
// }

function createCategory(name) {
	if (isExistingCategory(name)) {
		console.error(`Category: '${name}' already exists`);
		return;
	}
	userCategoryList.push(name);
	console.log("category added");
	reloadDisplay();
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
	addEventListeners();
}

function changeDisplay(newDisplay) {
	console.log(`Change display to: ${newDisplay}`);
	currentDisplay = newDisplay;
	reloadDisplay(currentDisplay);
}

function addEventListeners() {
	for (let i = 0; i < defaultCategories.length; i++) {
		defaultCategories[i].addEventListener("click", () => {
			console.log(`${defaultCategories[i]} clicked`);
			for (const element of document.getElementsByClassName(
				"active-category"
			)) {
				element.classList.remove("active-category");
			}
			changeDisplay(defaultCategories[i].lastElementChild.textContent);
			defaultCategories[i].classList.add("active-category");
		});
	}

	for (let i = 0; i < userCategories.children.length; i++) {
		userCategories.children[i].addEventListener("click", () => {
			console.log(`${userCategories.children[i]} clicked`);
			for (const element of document.getElementsByClassName(
				"active-category"
			)) {
				element.classList.remove("active-category");
			}
			changeDisplay(userCategories.children[i].textContent);
			userCategories.children[i].classList.add("active-category");
		});
	}
}

reloadDisplay("Inbox");
addEventListeners();
