// import {
//     autorun,
//     when,
//     reaction,
//     computed,
//     makeAutoObservable
// } from "mobx";
//
// // # Each todo should have:
// //     - id
// //     - name
// //     - isCompleted
// // # Each todo should be able to move between completed and not completed state
// // # Each todo should be able to update the name
// // # Print Log on Todo completed state change
// // # Add ability to add and remove todo
// // # Add ability to get list of completed todos and not completed todos
// // # Print log every time new todo is added or removed with the current status: total, completed, incomplete
// // # Print log only once when all todos are completed
//
// let runningId = 0
//
// class Todo {
//     id: number = runningId++;
//     name: string
//     isCompleted: boolean = false
//
//     constructor(name: string) {
//         this.name = name
//         makeAutoObservable(this)
//     }
//
//     setStatus() {
//         this.isCompleted = !this.isCompleted
//     }
//
//     setName(name: string) {
//         this.name = name
//     }
//
//
// }
//
// const newTodo = new Todo('nombre tarea')
// console.log(newTodo.isCompleted)
// autorun(() => {
//     console.log(`tarea completada: ${newTodo.isCompleted}`)
//
// })
//
// reaction(
//     (t) => newTodo.isCompleted,
//     () => console.log(`${newTodo.id}-Todo: ${newTodo.name} changed to ${newTodo.isCompleted ? 'Done' : 'Incomplete'}`)
// )
// newTodo.setStatus()
//
// class TodoList {
//     todoList: Todo[] = [];
//
//     constructor() {
//         makeAutoObservable(this, {
//             completedTodos: computed,
//             incompleteTodos: computed
//         })
//     }
//
//     addTodo(name: string) {
//         this.todoList.push(new Todo(name));
//     }
//
//     getTodo(name: string) {
//         return this.todoList.find(todo => todo.name === name);
//     }
//
//     removeTodo(name: string) {
//         const todoRemove = this.getTodo(name)
//         if (todoRemove) {
//             const todoIdx = this.todoList.indexOf(todoRemove)
//             this.todoList.splice(todoIdx, 1)
//         }
//     }
//
//     get completedTodos() {
//         return this.todoList.filter(todo => todo.isCompleted).length;
//     }
//
//     get incompleteTodos() {
//         return this.todoList.filter(todo => !todo.isCompleted).length;
//     }
//
//
// }
//
// const todoList = new TodoList();
//
// todoList.addTodo('Learn Mobx!');
// todoList.addTodo('Finish The Course!');
// todoList.addTodo('Add some Review!');
// todoList.addTodo('Go Play Outside');
//
// todoList.getTodo('Learn Mobx!')?.setStatus();
// todoList.getTodo('Finish The Course!')?.setStatus();
// todoList.getTodo('Add some Review!')?.setStatus();
// todoList.getTodo('Go Play Outside')?.setStatus();
//
// reaction(
//     () => todoList.todoList.length,
//     () => console.log(`Current Todo Count: ${todoList}, Done Todos: ${todoList.completedTodos}, Incomplete Todos: ${todoList.incompleteTodos}`)
// );
// //console.log(todoList)
//
// when(
//     () => todoList.todoList.length > 0 && todoList.todoList.every(todo => todo.isCompleted),
//     () => console.log(`Congratulations !`)
// );


//export {}

import {action, computed, observable, reaction, when} from "mobx";

let runningId = 0;

class Todo {
    id: number = runningId++;

    @observable
    name: string;
    @observable
    isCompleted: boolean = false;

    private readonly disposer: () => void;

    constructor(name: string) {
        this.name = name;

        this.disposer = reaction(
            () => this.isCompleted,
            () => console.log(`${this.id}-Todo: ${this.name} changed to ${this.isCompleted ? 'Done' : 'Incomplete'}`)
        );
    }

    @action
    toggleTodo() {
        this.isCompleted = !this.isCompleted;
    }

    @action
    updateName(name: string) {
        this.name = name;
    }

    dispose() {
        this.disposer();
    }
}

class TodoList {
    @observable
    todoList: Todo[] = [];

    constructor() {
        reaction(
            () => this.todoList.length,
            () => console.log(`Current Todo Count: ${this.todoList.length}, Done Todos: ${this.completedTodos}, Incomplete Todos: ${this.incompleteTodos}`)
        );

        when(
            () => this.todoList.length > 0 && this.todoList.every(todo => todo.isCompleted),
            () => console.log(`Congratulations !`)
        );
    }

    @action
    addTodo(name: string) {
        this.todoList.push(new Todo(name));
    }

    getTodo(name: string) {
        return this.todoList.find(todo => todo.name === name);
    }

    @action
    removeTodo(name: string) {
        const todoToRemove = this.getTodo(name);

        if (todoToRemove) {
            todoToRemove.dispose();
            const todoToRemoveIndex = this.todoList.indexOf(todoToRemove);
            this.todoList.splice(todoToRemoveIndex, 1);
        }
    }

    @computed
    get completedTodos() {
        return this.todoList.filter(todo => todo.isCompleted).length;
    }

    @computed
    get incompleteTodos() {
        return this.todoList.filter(todo => !todo.isCompleted).length;
    }
}


const todoList = new TodoList();

todoList.addTodo('Learn Mobx!');
todoList.addTodo('Finish The Course!');
todoList.addTodo('Add some Review!');
todoList.addTodo('Go Play Outside');

todoList.getTodo('Learn Mobx!')?.toggleTodo();
todoList.getTodo('Finish The Course!')?.toggleTodo();
todoList.getTodo('Add some Review!')?.toggleTodo();


todoList.removeTodo('Go Play Outside');
export {}