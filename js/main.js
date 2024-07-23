class Task {
    constructor(title, description, dueDate) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.completed = false;
    }
}

class ToDoList {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.taskListElement = document.getElementById('todo-list');
        this.render();
    }

    addTask(task) {
        this.tasks.push(task);
        this.saveTasks();
        this.render();
    }

    editTask(index, updatedTask) {
        this.tasks[index] = updatedTask;
        this.saveTasks();
        this.render();
    }

    toggleTask(index) {
        this.tasks[index].completed = !this.tasks[index].completed;
        this.saveTasks();
        this.render();
    }

    deleteTask(index) {
        this.tasks.splice(index, 1);
        this.saveTasks();
        this.render();
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    render() {
        this.taskListElement.innerHTML = '';
        this.tasks.forEach((task, index) => {
            const taskElement = document.createElement('li');
            taskElement.className = 'todo-item' + (task.completed ? ' completed' : '');
            taskElement.innerHTML = `
                <span>
                    <strong>${task.title}</strong> - ${task.dueDate}<br>
                    ${task.description}
                </span>
                <div>
                    <button class="edit-btn" onclick="todoList.editTaskPrompt(${index})">Edit</button>
                    <button class="delete-btn" onclick="todoList.deleteTask(${index})">Delete</button>
                </div>
            `;
            this.taskListElement.appendChild(taskElement);
        });
    }

    editTaskPrompt(index) {
        const task = this.tasks[index];
        const newTitle = prompt('Edit Task Title:', task.title);
        const newDescription = prompt('Edit Task Description:', task.description);
        const newDueDate = prompt('Edit Task Due Date:', task.dueDate);
        
        if (newTitle && newDescription && newDueDate) {
            const updatedTask = new Task(newTitle, newDescription, newDueDate);
            updatedTask.completed = task.completed;
            this.editTask(index, updatedTask);
        }
    }
}

const todoList = new ToDoList();

document.getElementById('todo-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('todo-input').value.trim();
    const description = document.getElementById('todo-description').value.trim();
    const dueDate = document.getElementById('todo-due-date').value;

    if (title && description && dueDate) {
        const newTask = new Task(title, description, dueDate);
        todoList.addTask(newTask);
        document.getElementById('todo-form').reset();
    }
});
