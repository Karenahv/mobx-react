
import {action, computed, makeAutoObservable, observable, reaction, when} from "mobx";
import TodoStore from "./todo-store";

let runningId = 0;

export default class Todo {
    id: number = runningId++;
    userId: number
    @observable
    name: string;
    @observable
    isCompleted: boolean = false;

    private readonly disposer: () => void;

    constructor(name: string, userId: number, todoStore:TodoStore) {
        makeAutoObservable(this, {})
        this.name = name;
        this.userId = userId;

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