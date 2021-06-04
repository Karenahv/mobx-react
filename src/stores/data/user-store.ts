import {action, makeAutoObservable, observable} from "mobx";
import RootStore from "../root-store";
import User from "./user";



export default class UserStore {
    @observable
    collection: User[];
    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this, {})
        this.rootStore = rootStore;
        this.collection = []
    }
    @action
    addUser(name:string){
        this.collection.push(new User(name, this.rootStore))
    }

    getUser(name:string){
        return this.collection.find(user=>user.name===name) as User
    }

    @action
    removeUser(name:string){
        const user = this.getUser(name)
        if(user){
            user.todos.forEach(todo=> this.rootStore.dataStore.todoStore.removeTodo(todo.name))
            const userIndexToRemove = this.collection.indexOf(user);
            this.collection.splice(userIndexToRemove, 1)

        }
    }
}