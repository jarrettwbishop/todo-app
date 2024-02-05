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
		notes: "",
		dueDate: "",
		priority: "",
	},
	{
		category: "Inbox",
		title: "Grocery shopping",
		notes: "Water, eggs, milk",
		dueDate: "",
		priority: "med",
	},
	{
		category: "Someday",
		title: "Finish cabinets",
		notes: "",
		dueDate: "12/31/24",
		priority: "",
	},
];

function Todo(category, title, notes, dueDate, priority) {
	return { category, title, notes, dueDate, priority };
}

function createTodo(category, title, notes, dueDate, priority) {
	const newTodo = Todo(category, title, notes, dueDate, priority);
	todoList.push(newTodo);
}

export function printTodoList() {
	console.log(todoList);
}
