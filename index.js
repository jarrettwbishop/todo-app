const categoryList = [
	{
		category: "Inbox",
		isEditable: false,
	},
	{
		category: "Today",
		isEditable: false,
	},
	{
		category: "Someday",
		isEditable: false,
	},
];

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

function Category(name) {
	return {
		name: name,
		isEditable: true,
	};
}

function createCategory(name) {
	if (isExistingCategory(name)) {
		console.error(`Category: '${name}' already exists`);
	}
	const newCategory = Category(name);
	categoryList.push(newCategory);
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
	for (const category of categoryList) {
		if ((category.category = name)) {
			return true;
		}
	}
}

function reloadDisplay(currentDisplay) {
	while (list.firstChild) {
		list.removeChild(list.firstChild);
	}
	displayTodoList(currentDisplay);
}

function changeDisplay(newDisplay) {
	currentDisplay = newDisplay;
	reloadDisplay(currentDisplay);
}

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

displayTodoList("Inbox");
