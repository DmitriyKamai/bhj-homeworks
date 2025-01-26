const tasksForm = document.getElementById('tasks__form');
const tasksInput = document.getElementById('task__input');
const taskAddBtn = document.getElementById('tasks__add');
const taskslist = document.getElementById('tasks__list');

tasksForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (tasksInput.value.trim().length) {
        todo.createNewTask(tasksInput.value.trim());
    }
});

class Todo {
    constructor() {
        this.taskList = [];
    }

    createNewTask(task) {
        const dateNow = Date.now();
        const newTask = {task: task,  id: dateNow};
        this.taskList.push(newTask);
        localStorage.setItem('taskList', JSON.stringify(this.taskList));
        this.renderTaskList();
        tasksForm.reset();
    }

    createOrder() {
        this.taskList.length = 0;
        if (localStorage.getItem('taskList')){
            this.taskList = JSON.parse(localStorage.getItem('taskList'));
            if (this.taskList.length) {
                this.taskList.sort((a,b) => {
                    if (a.id > b.id) {
                        return 1;
                    }
                    if (a.id < b.id) {
                        return -1;
                    }
                })
            }
        }
    }

    deleteTask(event) {
        const idForDelete = event.target.closest('.task').getAttribute('data-id');
        const indexForDelete = this.taskList.findIndex(element => element.id === +idForDelete);
        this.taskList.splice(indexForDelete, 1);
        localStorage.setItem('taskList', JSON.stringify(this.taskList));
        event.target.closest('.task').remove();
    }

    renderTaskList() {
        this.createOrder();
        const allTasks = Array.from(document.querySelectorAll('.task'));

        if (this.taskList.length) {
            for (let i = 0; i < this.taskList.length; i++) {
                const item = this.taskList[i];
                const taskElementIndex = allTasks.findIndex(element => element.getAttribute('data-id') === `${item.id}`)
                if (taskElementIndex === -1) {
                    const newTaskCode = `<div class="task" data-id="${item.id}"><div class="task__title">${item.task}</div><a href="#" class="task__remove">&times;</a></div>`;
                    taskslist.insertAdjacentHTML('afterBegin', newTaskCode);
                    taskslist.childNodes[0].childNodes[1].addEventListener('click', (e) => {
                        this.deleteTask(e)
                    })
                }
            }
        }
        
    }
}

const todo = new Todo();
todo.renderTaskList();