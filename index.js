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
	},
	{
		category: "Inbox",
		title: "Grocery shopping",
		notes: "Water, eggs, milk",
		dueDate: null,
		priority: "med",
	},
	{
		category: "Someday",
		title: "Finish cabinets",
		notes: null,
		dueDate: "12/31/24",
		priority: null,
	},
];

function Todo(category, title, notes, dueDate, priority) {
	return { category, title, notes, dueDate, priority };
}

function createTodo(category, title, notes, dueDate, priority) {
	const newTodo = Todo(category, title, notes, dueDate, priority);
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

function printTodoList(category) {
	const categorizedList = todoList.filter(
		(todo) => todo.category == category
	);

	console.log(categorizedList);
}

function isExistingCategory(name) {
	for (const category of categoryList) {
		if ((category.category = name)) {
			return true;
		}
	}
}
