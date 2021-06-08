import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import './test'
//import './test2'
import RootStore from "./stores/root-store";
import {createStore} from "./stores/helpers/create-store";
//import './example2'
//import './exercise1'
import {StoreProvider} from "./stores/helpers/store-context";

const rootStore = createStore()


console.log('rootStore', rootStore)

// create 4 users
//rootStore.dataStore.userStore.addUser('Georgy');
//rootStore.dataStore.userStore.addUser('Student 1');
//rootStore.dataStore.userStore.addUser('Student 2');
//rootStore.dataStore.userStore.addUser('Student 3');

//lets take the user so we can do actions on him
//const newUser = rootStore.dataStore.userStore.getUser('Georgy')

//lests add some todos to the user
 rootStore.dataStore.todoStore.addTodo('Finish the Course', 999)
 rootStore.dataStore.todoStore.addTodo('Learn Mobx', 999)
 rootStore.dataStore.todoStore.addTodo('Connect Mobx To React', 999)

// now we remove him
//rootStore.dataStore.userStore.removeUser('Georgy')


ReactDOM.render(
    <StoreProvider value={rootStore}>
        <App />
    </StoreProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
