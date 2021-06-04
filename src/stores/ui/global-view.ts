import RootStore from "../root-store";
import {autorun, makeAutoObservable} from "mobx";

export default class GlobalView {
    themeColor: string='blue'
    constructor(rootStore: RootStore) {
        makeAutoObservable(this, {})
        autorun(()=>{
            console.log('we have ', rootStore.dataStore.userStore.collection.length + 'USER' +
                'name of the users are' + rootStore.dataStore.userStore.collection.map(user=> user.name)+
            'todos' + rootStore.dataStore.todoStore.todoList.length + 'names ' + rootStore.dataStore.todoStore.todoList.map(t=>t.name))

        })



    }
}