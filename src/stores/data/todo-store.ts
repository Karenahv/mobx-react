import {action, computed, makeAutoObservable, observable, reaction, when} from "mobx";
import RootStore from "../root-store";
import Todo from "./Todo";



export default class TodoStore {
    @observable
    todoList: Todo[] = [];

    constructor() {
        makeAutoObservable(this, {})
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
    addTodo(name: string, userId:number) {
        this.todoList.push(new Todo(name,userId, this));
    }

    getTodo(name: string) {
        return this.todoList.find(todo => todo.name === name);
    }
    @action
    editTodo(newname: string, name: string){
        const todoToEdit = this.getTodo(name);
        if(todoToEdit){
            todoToEdit.name = newname
        }
    }

    getUserTodos(userId: number){
        return this.todoList.filter(todo=> todo.userId === userId)
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
        return this.todoList.filter(todo => todo.isCompleted);
    }

    @computed
    get incompleteTodos() {
        return this.todoList.filter(todo => !todo.isCompleted);
    }
}