import {computed, observable} from "mobx";
import RootStore from "../root-store";


let runningID = 0;


export default class User {
    id: number;
    @observable
    name: string;

    private readonly rootStore: RootStore

    constructor(name:string, rootStore:RootStore) {
        this.name = name
        this.id= runningID++
        this.rootStore = rootStore

        rootStore.dataStore.todoStore.addTodo('Finish the course!', this.id)
    }

    @computed
    get todos(){
        return this.rootStore.dataStore.todoStore.getUserTodos(this.id)
    }
}