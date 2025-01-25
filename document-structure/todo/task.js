const tasksForm = document.getElementById('tasks__form');
const tasksInput = document.getElementById('task__input');
const taskAddBtn = document.getElementById('tasks__add');
const taskslist = document.getElementById('tasks__list');

tasksForm.addEventListener('submit', (e) => {
    e.preventDefault();
});

tasksInput.addEventListener('keydown', (e) => {
    if (e.target.value.length) {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            todo.createNewTask(e.target.value);
        }
    }
});


taskAddBtn.addEventListener('click', (e) => {
    if (tasksInput.value.length) {
        todo.createNewTask(tasksInput.value);
    }
});


class Todo {
    constructor() {
        this.taskList = [];
    }

    createNewTask(task) {
        const dateNow = Date.now();
        const newTask = {task: task,  id: dateNow};
        localStorage.setItem(dateNow, JSON.stringify(newTask));
        this.renderTaskList();
        tasksForm.reset();
    }

    createOrder() {
        this.taskList.length = 0;
        if (localStorage.length) {
            for (let i = 0; i < localStorage.length; i++) {
                const itemKey = localStorage.key(i);
                const itemInLS = JSON.parse(localStorage.getItem(itemKey));
                this.taskList.push(itemInLS);
            }
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

    deleteTask(event) {
        const idForDelete = event.target.closest('.task').getAttribute('data-id');
        localStorage.removeItem(idForDelete);
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