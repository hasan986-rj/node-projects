import inquirer from 'inquirer';
const todoList = [];
function displayMenu() {
    console.log('\nTodo App Menu:');
    console.log('1. List Todos');
    console.log('2. Add Todo');
    console.log('3. Quit');
}
function listTodos() {
    if (todoList.length === 0) {
        console.log('No todos found.');
    }
    else {
        console.log('\nTodo List:');
        todoList.forEach((todo, index) => {
            console.log(`${index + 1}. ${todo}`);
        });
    }
}
function addTodo() {
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'todo',
            message: 'Enter a new todo:',
        },
    ])
        .then((answers) => {
        let newTodo = answers.todo.trim();
        if (newTodo) {
            todoList.push(newTodo);
            console.log('Todo added successfully.');
        }
        else {
            console.log('Todo cannot be empty.');
        }
        mainMenu();
    });
}
function mainMenu() {
    displayMenu();
    inquirer
        .prompt([
        {
            type: 'number',
            name: 'option',
            message: 'Select an option (1-3):',
        },
    ])
        .then((answers) => {
        switch (answers.option) {
            case 1:
                listTodos();
                break;
            case 2:
                addTodo();
                break;
            case 3:
                console.log('Goodbye!');
                process.exit(0);
                break;
            default:
                console.log('Invalid option. Please try again.');
                mainMenu();
        }
    });
}
// Start the Todo app
mainMenu();
