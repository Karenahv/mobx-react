import RootStore from "../root-store";
import {action, autorun, makeAutoObservable} from "mobx";

export enum Views {
    Todos = 'Todos',
    Users = 'Users'
}
export default class GlobalView {
    private rootStore: RootStore
    currentView: Views = Views.Todos
    themeColor: string='blue'
    constructor(rootStore: RootStore) {
        makeAutoObservable(this, {})
        autorun(()=>{
            console.log('we have ', rootStore.dataStore.userStore.collection.length + 'USER' +
                'name of the users are' + rootStore.dataStore.userStore.collection.map(user=> user.name)+
            'todos' + rootStore.dataStore.todoStore.todoList.length + 'names ' + rootStore.dataStore.todoStore.todoList.map(t=>t.name))

        })
        this.rootStore = rootStore



    }
    @action
        updateView(view: Views){
            this.currentView = view
        }
}