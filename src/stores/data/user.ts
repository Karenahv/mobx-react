import {computed, makeAutoObservable, observable} from "mobx";
import RootStore from "../root-store";


let runningID = 0;


export default class User {
    id: number;
    @observable
    name: string;

    private readonly rootStore: RootStore

    constructor(name:string, rootStore:RootStore) {
        makeAutoObservable(this, {})
        this.name = name
        this.id= runningID++
        this.rootStore = rootStore

        rootStore.dataStore.todoStore.addTodo('Finish the course!', this.id)
    }

    @computed
    get todos(){
        return this.rootStore.dataStore.todoStore.getUserTodos(this.id)
    }

    @computed
    get completedTodos() {
        return this.todos.filter(todo => todo.isCompleted);
    }

    @computed
    get incompleteTodos() {
        return this.todos.filter(todo => !todo.isCompleted);
    }
}